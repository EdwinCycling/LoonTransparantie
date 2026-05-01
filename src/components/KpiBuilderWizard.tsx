import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Bot, Copy, FileSearch, ShieldCheck, Sparkles, X } from 'lucide-react';

interface KpiBuilderWizardProps {
  open: boolean;
  onClose: () => void;
}

interface BuilderStatus {
  aiReady: boolean;
  exactDocsAvailable: boolean;
  exactDocsUpdatedAt: string | null;
  unlocked: boolean;
}

interface EndpointDocSection {
  title: string;
  uri: string;
  scope: string;
  summary: string;
  properties: string[];
  score?: number;
}

interface BuilderContext {
  existingMetrics: string[];
  endpointCatalog: EndpointDocSection[];
  exactDocsUpdatedAt: string | null;
}

interface BuilderDraft {
  name: string;
  code: string;
  category: string;
  description: string;
  businessQuestion: string;
  formula: string;
  unit: string;
  aggregation: string;
  interpretation: string;
  validationRules: string;
  periodModes: string[];
  contextPath: string;
  employeeAttributeCode: string;
  employeeAttributeLabel: string;
  employeeAttributeDatatype: string;
  employeeAttributeSourceField: string;
  userPhrases: string;
  selectedEndpoints: string[];
}

const defaultStatus: BuilderStatus = {
  aiReady: false,
  exactDocsAvailable: false,
  exactDocsUpdatedAt: null,
  unlocked: false
};

const defaultDraft: BuilderDraft = {
  name: '',
  code: '',
  category: 'Operations',
  description: '',
  businessQuestion: '',
  formula: '',
  unit: '',
  aggregation: 'average',
  interpretation: '',
  validationRules: '',
  periodModes: ['nu'],
  contextPath: 'HRAnalysisModel/KPIExtensies/KPI',
  employeeAttributeCode: '',
  employeeAttributeLabel: '',
  employeeAttributeDatatype: 'decimal',
  employeeAttributeSourceField: '',
  userPhrases: '',
  selectedEndpoints: []
};

function slugifyMetricCode(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const KpiBuilderWizard: React.FC<KpiBuilderWizardProps> = ({ open, onClose }) => {
  const [status, setStatus] = useState<BuilderStatus>(defaultStatus);
  const [context, setContext] = useState<BuilderContext | null>(null);
  const [draft, setDraft] = useState<BuilderDraft>(defaultDraft);
  const [statusLoading, setStatusLoading] = useState(false);
  const [contextLoading, setContextLoading] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [docsQuery, setDocsQuery] = useState('');
  const [docsResults, setDocsResults] = useState<EndpointDocSection[]>([]);
  const [aiQuestion, setAiQuestion] = useState('Welke Exact Online endpoints en XML-velden adviseer je voor deze KPI?');
  const [aiAnswer, setAiAnswer] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const readResponseJson = async (response: Response) => {
    const text = await response.text();
    if (!text) {
      return {};
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Error: ${text.slice(0, 180)}`);
    }
  };

  const selectedEndpointDetails = useMemo(() => {
    if (!context) return [];
    return draft.selectedEndpoints
      .map((uri) => context.endpointCatalog.find((item) => item.uri === uri))
      .filter((item): item is EndpointDocSection => Boolean(item));
  }, [context, draft.selectedEndpoints]);

  const metricCodeExists = useMemo(() => {
    const currentCode = (draft.code || slugifyMetricCode(draft.name)).trim().toLowerCase();
    if (!currentCode || !context?.existingMetrics?.length) {
      return false;
    }
    return context.existingMetrics.some((metric) => metric.toLowerCase() === currentCode);
  }, [context, draft.code, draft.name]);

  const xmlPreview = useMemo(() => {
    const code = draft.code || slugifyMetricCode(draft.name) || 'new_metric';
    const lines = [
      '<KPIExtensies>',
      '  <KPI>',
      `    <Code>${escapeXml(code)}</Code>`,
      `    <Naam>${escapeXml(draft.name || 'Nieuwe KPI')}</Naam>`,
      `    <Categorie>${escapeXml(draft.category || 'Operations')}</Categorie>`,
      `    <Beschrijving>${escapeXml(draft.description || 'Beschrijf hier de KPI.')}</Beschrijving>`,
      '    <Bronnen>'
    ];

    if (draft.selectedEndpoints.length === 0) {
      lines.push('      <Bron>', '        <Endpoint>/api/v1/{division}/...</Endpoint>', '        <Veld>...</Veld>', '      </Bron>');
    } else {
      draft.selectedEndpoints.forEach((endpoint) => {
        lines.push('      <Bron>', `        <Endpoint>${escapeXml(endpoint)}</Endpoint>`);
        if (draft.employeeAttributeSourceField) {
          lines.push(`        <Veld>${escapeXml(draft.employeeAttributeSourceField)}</Veld>`);
        }
        lines.push('      </Bron>');
      });
    }

    lines.push(
      '    </Bronnen>',
      '    <Parameters>'
    );

    draft.periodModes.forEach((mode) => {
      lines.push('      <Parameter>', '        <Naam>period</Naam>', `        <Waarde>${escapeXml(mode)}</Waarde>`, '      </Parameter>');
    });

    lines.push(
      '    </Parameters>',
      `    <Formule>${escapeXml(draft.formula || 'average(...)')}</Formule>`,
      `    <ContextPad>${escapeXml(draft.contextPath)}</ContextPad>`,
      `    <MedewerkerPad>${escapeXml('HRAnalysisModel/Medewerkers/Medewerker/KPIAttributen/Attribuut')}</MedewerkerPad>`,
      `    <Aggregatie>${escapeXml(draft.aggregation)}</Aggregatie>`,
      '  </KPI>',
      '</KPIExtensies>',
      '',
      '<KPIAttributen>',
      '  <Attribuut>',
      `    <Code>${escapeXml(draft.employeeAttributeCode || code)}</Code>`,
      `    <Label>${escapeXml(draft.employeeAttributeLabel || draft.name || 'Nieuwe KPI')}</Label>`,
      `    <Datatype>${escapeXml(draft.employeeAttributeDatatype || 'decimal')}</Datatype>`,
      '    <Waarde>{{ berekende_waarde }}</Waarde>',
      `    <BronEndpoint>${escapeXml(draft.selectedEndpoints[0] || '/api/v1/{division}/...')}</BronEndpoint>`,
      `    <BronVeld>${escapeXml(draft.employeeAttributeSourceField || '...')}</BronVeld>`,
      '  </Attribuut>',
      '</KPIAttributen>'
    );

    return lines.join('\n');
  }, [draft]);

  const yamlPreview = useMemo(() => {
    const code = draft.code || slugifyMetricCode(draft.name) || 'new_metric';
    const phrases = draft.userPhrases
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    const endpoints = draft.selectedEndpoints.length > 0 ? draft.selectedEndpoints : ['/api/v1/{division}/...'];

    return [
      `- metric: "${code}"`,
      `  category: "${draft.category || 'Operations'}"`,
      `  description: "${(draft.description || 'Beschrijf hier de KPI.').replace(/"/g, "'")}"`,
      `  formula: "${(draft.formula || 'average(...)').replace(/"/g, "'")}"`,
      `  unit: "${draft.unit || 'value'}"`,
      `  aggregation: "${draft.aggregation || 'average'}"`,
      '  api_source:',
      ...endpoints.map((endpoint) => `    - "${endpoint}"`),
      '  parameters:',
      '    period:',
      ...draft.periodModes.map((mode) => `      - "${mode}"`),
      `  mapping_model: "HAM_2.0"`,
      '  xml_extension:',
      `    context_path: "${draft.contextPath}"`,
      '    employee_attribute_path: "HRAnalysisModel/Medewerkers/Medewerker/KPIAttributen/Attribuut"',
      `    employee_attribute_code: "${draft.employeeAttributeCode || code}"`,
      `    employee_attribute_type: "${draft.employeeAttributeDatatype || 'decimal'}"`,
      `    source_field: "${(draft.employeeAttributeSourceField || '...').replace(/"/g, "'")}"`,
      `  interpretation: "${(draft.interpretation || 'Voeg hier de zakelijke duiding toe.').replace(/"/g, "'")}"`,
      '  validation_rules:',
      ...((draft.validationRules || 'Controleer populatie > 0.\nControleer verplichte bronvelden.')
        .split('\n')
        .map((rule) => rule.trim())
        .filter(Boolean)
        .map((rule) => `    - "${rule.replace(/"/g, "'")}"`)),
      '  user_phrases:',
      ...(phrases.length > 0 ? phrases : ['Wat is deze KPI nu?', 'Laat de trend van deze KPI zien.']).map((phrase) => `    - "${phrase.replace(/"/g, "'")}"`)
    ].join('\n');
  }, [draft]);

  const techSpecsPreview = useMemo(() => {
    const code = draft.code || slugifyMetricCode(draft.name) || 'new_metric';
    const endpoints = draft.selectedEndpoints.length > 0 ? draft.selectedEndpoints : ['/api/v1/{division}/...'];
    const rules = (draft.validationRules || 'Controleer of brondata aanwezig is.\nGeen aannames buiten beschikbare dataset.')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    return [
      '<!-- PAGE BREAK -->',
      '',
      `# KPI - ${draft.name || 'Nieuwe KPI'}`,
      '',
      '## Functioneel doel',
      draft.description || 'Beschrijf hier het functionele doel van de KPI.',
      '',
      '## API-bronnen',
      ...endpoints.map((endpoint) => `- \`${endpoint}\``),
      '',
      '## Snapshotlogica',
      '- Definieer hier wanneer een record actief of relevant is op peildatum.',
      `- Bepaal medewerkerattribuut \`${draft.employeeAttributeCode || code}\` vanuit het gekozen bronveld.`,
      '',
      '## Formule',
      `\`${draft.formula || 'average(...)'}\``,
      '',
      '## YAML-koppeling',
      `- metric: \`${code}\``,
      `- unit: \`${draft.unit || 'value'}\``,
      `- parameters: \`${draft.periodModes.join(', ') || 'nu'}\``,
      '',
      '## HAM-opbouw',
      `- Root pad: \`${draft.contextPath}\``,
      '- Medewerkerpad: `HRAnalysisModel/Medewerkers/Medewerker/KPIAttributen/Attribuut`',
      `- Attribuutcode: \`${draft.employeeAttributeCode || code}\``,
      '',
      '## AI-rapportage',
      '- Gebruik een tabel met peildatum, waarde en relevante delta.',
      `- Interpretatie: ${draft.interpretation || 'Voeg hier de zakelijke interpretatie toe.'}`,
      '',
      '## Validatie',
      ...rules.map((rule) => `- ${rule}`)
    ].join('\n');
  }, [draft]);

  const applyDraftPatch = (patch: Partial<BuilderDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const loadStatus = async () => {
    setStatusLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/kpi-builder/status', {
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data: any = await readResponseJson(response);
      if (!response.ok) {
        throw new Error(data?.error || 'Error: Status van de KPI wizard kon niet worden geladen.');
      }
      setStatus({
        aiReady: data.aiReady === true,
        exactDocsAvailable: data.exactDocsAvailable === true,
        exactDocsUpdatedAt: typeof data.exactDocsUpdatedAt === 'string' ? data.exactDocsUpdatedAt : null,
        unlocked: data.unlocked === true
      });
    } catch (err: any) {
      setError(err.message || 'Error: Status van de KPI wizard kon niet worden geladen.');
    } finally {
      setStatusLoading(false);
    }
  };

  const loadContext = async () => {
    setContextLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/kpi-builder/context', {
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data: any = await readResponseJson(response);
      if (!response.ok) {
        throw new Error(data?.error || 'Error: Wizardcontext kon niet worden geladen.');
      }
      setContext({
        existingMetrics: Array.isArray(data.existingMetrics) ? data.existingMetrics : [],
        endpointCatalog: Array.isArray(data.endpointCatalog) ? data.endpointCatalog : [],
        exactDocsUpdatedAt: typeof data.exactDocsUpdatedAt === 'string' ? data.exactDocsUpdatedAt : null
      });
    } catch (err: any) {
      setError(err.message || 'Error: Wizardcontext kon niet worden geladen.');
    } finally {
      setContextLoading(false);
    }
  };

  const searchDocs = async (query?: string) => {
    const finalQuery = (query ?? docsQuery).trim();
    if (!finalQuery) {
      setDocsResults([]);
      return;
    }

    setDocsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/kpi-builder/docs-search?q=${encodeURIComponent(finalQuery)}`, {
        credentials: 'include',
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data: any = await readResponseJson(response);
      if (!response.ok) {
        throw new Error(data?.error || 'Error: Exact documentatie kon niet worden doorzocht.');
      }
      setDocsResults(Array.isArray(data.results) ? data.results : []);
    } catch (err: any) {
      setError(err.message || 'Error: Exact documentatie kon niet worden doorzocht.');
    } finally {
      setDocsLoading(false);
    }
  };

  const askAi = async () => {
    const question = aiQuestion.trim();
    if (!question) {
      setError('Error: Geef eerst een AI-vraag op voor de wizard.');
      return;
    }

    setAiLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/kpi-builder/assist', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          question,
          draft
        })
      });
      const data: any = await readResponseJson(response);
      if (!response.ok) {
        throw new Error(data?.error || 'Error: AI-ondersteuning kon niet worden opgehaald.');
      }
      setAiAnswer(typeof data.answer === 'string' ? data.answer : 'Geen AI-antwoord ontvangen.');
      if (Array.isArray(data.sourceSections)) {
        setDocsResults(data.sourceSections);
      }
    } catch (err: any) {
      setError(err.message || 'Error: AI-ondersteuning kon niet worden opgehaald.');
    } finally {
      setAiLoading(false);
    }
  };

  const saveDefinition = async () => {
    const metricCode = draft.code || slugifyMetricCode(draft.name);
    const confirmed = window.confirm(
      `Weet je zeker dat je KPI "${draft.name || 'Nieuwe KPI'}" met metric code "${metricCode || 'onbekend'}" definitief wilt toevoegen aan yaml.json en Tech specs.md?`
    );

    if (!confirmed) {
      return;
    }

    setSaveLoading(true);
    setError(null);
    setSaveFeedback(null);

    try {
      const response = await fetch('/api/kpi-builder/confirm', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ draft })
      });
      const data: any = await readResponseJson(response);
      if (!response.ok || data.success !== true) {
        throw new Error(data?.error || 'Error: KPI definitie kon niet worden opgeslagen.');
      }

      setSaveFeedback(`KPI "${data.metric || metricCode}" is opgeslagen in yaml.json en Tech specs.md.`);
      setContext((prev) => ({
        existingMetrics: Array.isArray(data.existingMetrics)
          ? data.existingMetrics
          : prev?.existingMetrics || [],
        endpointCatalog: prev?.endpointCatalog || [],
        exactDocsUpdatedAt: prev?.exactDocsUpdatedAt || null
      }));
    } catch (err: any) {
      setError(err.message || 'Error: KPI definitie kon niet worden opgeslagen.');
    } finally {
      setSaveLoading(false);
    }
  };

  const togglePeriodMode = (mode: string) => {
    setDraft((prev) => {
      const hasMode = prev.periodModes.includes(mode);
      const nextModes = hasMode ? prev.periodModes.filter((item) => item !== mode) : [...prev.periodModes, mode];
      return {
        ...prev,
        periodModes: nextModes.length > 0 ? nextModes : ['nu']
      };
    });
  };

  const toggleEndpoint = (uri: string) => {
    setDraft((prev) => {
      const exists = prev.selectedEndpoints.includes(uri);
      return {
        ...prev,
        selectedEndpoints: exists
          ? prev.selectedEndpoints.filter((item) => item !== uri)
          : [...prev.selectedEndpoints, uri]
      };
    });
  };

  const copyToClipboard = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyFeedback(`${label} gekopieerd.`);
      window.setTimeout(() => setCopyFeedback(null), 2500);
    } catch {
      setCopyFeedback('Kopieren is niet gelukt.');
      window.setTimeout(() => setCopyFeedback(null), 2500);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    loadStatus();
  }, [open]);

  useEffect(() => {
    if (!open || !status.unlocked) {
      return;
    }
    loadContext();
  }, [open, status.unlocked]);

  useEffect(() => {
    if (!draft.name) {
      return;
    }
    if (!draft.code) {
      const generatedCode = slugifyMetricCode(draft.name);
      const generatedAttribute = `${generatedCode}_value`;
      applyDraftPatch({
        code: generatedCode,
        employeeAttributeCode: generatedAttribute,
        employeeAttributeLabel: draft.name
      });
    }
  }, [draft.name, draft.code]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4">
      <div className="relative flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              <ShieldCheck className="h-4 w-4" />
              KPI wizard
            </div>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">KPI Builder voor Exact Online</h2>
            <p className="mt-1 text-sm text-slate-500">
              Bouw veilig uitbreidingen voor nieuwe KPI&apos;s met XML-, YAML- en Tech Specs-voorbeelden.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Sluit KPI wizard"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {copyFeedback && (
          <div className="border-b border-emerald-200 bg-emerald-50 px-6 py-3 text-sm text-emerald-700">
            {copyFeedback}
          </div>
        )}

        {saveFeedback && (
          <div className="border-b border-emerald-200 bg-emerald-50 px-6 py-3 text-sm text-emerald-700">
            {saveFeedback}
          </div>
        )}

        {!status.unlocked && !statusLoading ? (
          <div className="flex flex-1 items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <div className="text-lg font-bold text-slate-900">KPI Agent nog vergrendeld</div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Deze wizard is beschikbaar nadat je de HR & Payroll KPI Agent hebt ontgrendeld in het vorige scherm.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Sluiten
              </button>
            </div>
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden xl:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-y-auto border-r border-slate-200 bg-white p-6">
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
                <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    KPI basis
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">KPI naam</label>
                      <input
                        value={draft.name}
                        onChange={(event) => applyDraftPatch({ name: event.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Bijvoorbeeld: Verzuimuren laatste 30 dagen"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Metric code</label>
                      <div className="flex gap-2">
                        <input
                          value={draft.code}
                          onChange={(event) => applyDraftPatch({ code: slugifyMetricCode(event.target.value) })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="verzuimuren_laatste_30_dagen"
                        />
                        <button
                          type="button"
                          onClick={() => applyDraftPatch({ code: slugifyMetricCode(draft.name) })}
                          className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Genereer
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Categorie</label>
                        <input
                          value={draft.category}
                          onChange={(event) => applyDraftPatch({ category: event.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="Operations"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Eenheid</label>
                        <input
                          value={draft.unit}
                          onChange={(event) => applyDraftPatch({ unit: event.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="hours"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Beschrijving</label>
                      <textarea
                        value={draft.description}
                        onChange={(event) => applyDraftPatch({ description: event.target.value })}
                        rows={4}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Leg in gewone taal uit wat deze KPI meet."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Business vraag</label>
                      <textarea
                        value={draft.businessQuestion}
                        onChange={(event) => {
                          const value = event.target.value;
                          applyDraftPatch({ businessQuestion: value });
                          if (!docsQuery) {
                            setDocsQuery(value);
                          }
                        }}
                        rows={3}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Welke managementvraag moet deze KPI beantwoorden?"
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <FileSearch className="h-4 w-4 text-indigo-600" />
                    Berekening en validatie
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Formule</label>
                      <textarea
                        value={draft.formula}
                        onChange={(event) => applyDraftPatch({ formula: event.target.value })}
                        rows={3}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="sum(LeaveAbsenceHoursByDay.Hours where Date >= peildatum-30)"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Aggregatie</label>
                      <input
                        value={draft.aggregation}
                        onChange={(event) => applyDraftPatch({ aggregation: event.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="average, sum, ratio, count"
                      />
                    </div>

                    <div>
                      <div className="mb-2 block text-sm font-medium text-slate-700">Periodes</div>
                      <div className="flex flex-wrap gap-2">
                        {['nu', 'vorig_jaar', 'trend'].map((mode) => {
                          const active = draft.periodModes.includes(mode);
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => togglePeriodMode(mode)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
                            >
                              {mode}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Interpretatie</label>
                      <textarea
                        value={draft.interpretation}
                        onChange={(event) => applyDraftPatch({ interpretation: event.target.value })}
                        rows={3}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Leg uit wat een stijgende of dalende waarde zakelijk betekent."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Validatieregels</label>
                      <textarea
                        value={draft.validationRules}
                        onChange={(event) => applyDraftPatch({ validationRules: event.target.value })}
                        rows={4}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder={'Controleer actieve populatie > 0.\nControleer dat Hours numeriek is.\nGeef "No data available" als de bron leeg is.'}
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    XML mapping
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Root context pad</label>
                      <input
                        value={draft.contextPath}
                        onChange={(event) => applyDraftPatch({ contextPath: event.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Attribuut code</label>
                        <input
                          value={draft.employeeAttributeCode}
                          onChange={(event) => applyDraftPatch({ employeeAttributeCode: slugifyMetricCode(event.target.value) })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="absence_hours_30d_value"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Attribuut label</label>
                        <input
                          value={draft.employeeAttributeLabel}
                          onChange={(event) => applyDraftPatch({ employeeAttributeLabel: event.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="Verzuimuren 30 dagen"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Datatype</label>
                        <input
                          value={draft.employeeAttributeDatatype}
                          onChange={(event) => applyDraftPatch({ employeeAttributeDatatype: event.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="decimal"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Bronveld</label>
                        <input
                          value={draft.employeeAttributeSourceField}
                          onChange={(event) => applyDraftPatch({ employeeAttributeSourceField: event.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="Hours"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Voorbeeld gebruikersvragen</label>
                      <textarea
                        value={draft.userPhrases}
                        onChange={(event) => applyDraftPatch({ userPhrases: event.target.value })}
                        rows={4}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder={'Wat zijn de verzuimuren over de laatste 30 dagen?\nLaat de trend van verzuimuren zien.'}
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <AlertCircle className="h-4 w-4 text-indigo-600" />
                    Bestaande metrics
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Handig om naming en structuur gelijk te houden aan de huidige YAML-definities.
                  </p>
                  <div className="mt-4 max-h-56 overflow-y-auto rounded-xl bg-slate-50 p-4">
                    {contextLoading ? (
                      <div className="text-sm text-slate-500">Bestaande metrics laden...</div>
                    ) : context?.existingMetrics?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {context.existingMetrics.map((metric) => (
                          <button
                            key={metric}
                            type="button"
                            onClick={() => applyDraftPatch({ code: metric })}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            {metric}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">Geen metrics gevonden.</div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="overflow-y-auto bg-slate-50 p-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FileSearch className="h-4 w-4 text-indigo-600" />
                  Exact Online documentatie
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Zoek relevante endpoints uit de lokale Exact documentatie en voeg ze direct toe aan je concept.
                </p>

                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    value={docsQuery}
                    onChange={(event) => setDocsQuery(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Zoek op verzuim, salary, department, contract..."
                  />
                  <button
                    type="button"
                    onClick={() => searchDocs()}
                    disabled={docsLoading || !status.exactDocsAvailable}
                    className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {docsLoading ? 'Zoeken...' : 'Zoek docs'}
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <div>Documentatie geladen: {status.exactDocsAvailable ? 'ja' : 'nee'}</div>
                  {(status.exactDocsUpdatedAt || context?.exactDocsUpdatedAt) && (
                    <div>Laatste update bronbestand: {status.exactDocsUpdatedAt || context?.exactDocsUpdatedAt}</div>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  {(docsResults.length > 0 ? docsResults : context?.endpointCatalog?.slice(0, 8) || []).map((result) => {
                    const active = draft.selectedEndpoints.includes(result.uri);
                    return (
                      <div key={result.uri} className="rounded-xl border border-slate-200 p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{result.title}</div>
                            <div className="mt-1 font-mono text-xs text-slate-500">{result.uri}</div>
                            <div className="mt-2 text-sm text-slate-600">{result.summary}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleEndpoint(result.uri)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-indigo-100 text-indigo-700' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
                          >
                            {active ? 'Geselecteerd' : 'Gebruik endpoint'}
                          </button>
                        </div>

                        <div className="mt-3">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Velden</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {result.properties.slice(0, 8).map((property) => (
                              <button
                                key={`${result.uri}-${property}`}
                                type="button"
                                onClick={() => applyDraftPatch({ employeeAttributeSourceField: property })}
                                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${draft.employeeAttributeSourceField === property ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
                              >
                                {property}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  Live AI ondersteuning
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Laat AI op basis van de lokale Exact documentatie, HAM-structuur en je concept meedenken over endpoints, velden en documentatie.
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  AI gereed: {status.aiReady ? 'ja' : 'nee, fallback gebruikt documentatie zonder live model'}
                </div>

                <textarea
                  value={aiQuestion}
                  onChange={(event) => setAiQuestion(event.target.value)}
                  rows={3}
                  className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                <button
                  type="button"
                  onClick={askAi}
                  disabled={aiLoading}
                  className="mt-3 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {aiLoading ? 'AI analyseert...' : 'Vraag AI advies'}
                </button>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">AI antwoord</div>
                  <div className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {aiAnswer || 'Nog geen AI-antwoord opgehaald.'}
                  </div>
                </div>
              </section>

              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Copy className="h-4 w-4 text-indigo-600" />
                  Gegenereerde snippets
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Deze snippets zijn bedoeld als startpunt om veilig nieuwe KPI&apos;s toe te voegen aan XML, YAML en Tech Specs.
                </p>

                <div className="mt-4 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">XML extensie</div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('XML snippet', xmlPreview)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Kopieer XML
                      </button>
                    </div>
                    <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{xmlPreview}</pre>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">YAML definitie</div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('YAML snippet', yamlPreview)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Kopieer YAML
                      </button>
                    </div>
                    <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{yamlPreview}</pre>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">Tech specs hoofdstuk</div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('Tech specs snippet', techSpecsPreview)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Kopieer Tech specs
                      </button>
                    </div>
                    <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{techSpecsPreview}</pre>
                  </div>
                </div>

                {selectedEndpointDetails.length > 0 && (
                  <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900">
                    <div className="font-semibold">Geselecteerde Exact endpoints</div>
                    <ul className="mt-2 space-y-1">
                      {selectedEndpointDetails.map((item) => (
                        <li key={item.uri}>{item.uri}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Definitief toevoegen</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Na bevestiging wordt deze KPI-definitie direct toegevoegd aan `public/yaml.json` en `public/Tech specs.md`.
                  </p>
                  {metricCodeExists && (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                      Error: Deze metric code bestaat al. Kies eerst een unieke metric code.
                    </div>
                  )}
                  <div className="mt-3 text-sm text-slate-600">
                    <div>Metric code: <span className="font-mono text-slate-800">{draft.code || slugifyMetricCode(draft.name) || '-'}</span></div>
                    <div>Doelbestanden: <span className="font-mono text-slate-800">public/yaml.json</span> en <span className="font-mono text-slate-800">public/Tech specs.md</span></div>
                  </div>
                  <button
                    type="button"
                    onClick={saveDefinition}
                    disabled={saveLoading || metricCodeExists}
                    className="mt-4 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {saveLoading ? 'KPI opslaan...' : 'Definitief toevoegen'}
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {statusLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
              KPI wizard status laden...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiBuilderWizard;
