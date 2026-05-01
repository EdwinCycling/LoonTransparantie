# Exact Online REST API Documentation

Volledige export - Gegenereerd op: 4/24/2026, 7:03:34 PM

---

## AbsenceRegistrations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - AbsenceRegistrations

## Endpoint

AbsenceRegistrations

## Good to know

Use this endpoint to read Absence registrations.

This endpoint shows the employee's illness registration information.

**Note:** In case the division is linked to Exact Officient, new absence registrations will not be available in Exact Online anymore. Instead, the illness hours per day are available. Please refer to /api/v1/{division}/HRM/LeaveAbsenceHoursByDay.
 To see if a division is linked to Exact Officient, property IsHRDivision in /api/v1/{division}/system/Divisions can be used.

For more information about the HRM functionality in Exact Online, see Work with leave and absence registrations.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/AbsenceRegistrations

GET 
## Example usage

/api/v1/{division}/hrm/AbsenceRegistrations

/api/v1/{division}/hrm/AbsenceRegistrations

/api/v1/{division}/hrm/AbsenceRegistrations

/api/v1/{division}/hrm/AbsenceRegistrations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AbsenceRegistrationTransactions | False |  |  | AbsenceRegistrationTransactions | Collection of absence registration transactions |
|  | Cause | False |  |  | Edm.Int16 | Absence cause, only supported for the Netherland legislation |
|  | CauseCode | False |  |  | Edm.String | Code for the absence cause, only supported for the Netherland legislation |
|  | CauseDescription | False |  |  | Edm.String | Description for the absence cause, only supported for the Netherland legislation |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee linked to the absence |
|  | EmployeeFullName | False |  |  | Edm.String | Employee full name |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | Kind | False |  |  | Edm.Int16 | Obsolete |
|  | KindCode | False |  |  | Edm.String | Obsolete |
|  | KindDescription | False |  |  | Edm.String | Obsolete |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Extra information for absence |

## Returns

---

## AbsenceRegistrationTransactions

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - AbsenceRegistrationTransactions

## Endpoint

AbsenceRegistrationTransactions

## Good to know

Use this endpoint to read Absence registrations.

This endpoint shows the employee information which contains the details and recovery stages of the illness registrations.

**Note:** In case the division is linked to Exact Officient, new absence registrations will not be available in Exact Online anymore. Instead, the illness hours per day are available. Please refer to /api/v1/{division}/HRM/LeaveAbsenceHoursByDay.
 To see if a division is linked to Exact Officient, property IsHRDivision in /api/v1/{division}/system/Divisions can be used.

For more information about the HRM functionality in Exact Online, see Working with Absence registrations.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/AbsenceRegistrationTransactions

GET 
## Example usage

/api/v1/{division}/hrm/AbsenceRegistrationTransactions

/api/v1/{division}/hrm/AbsenceRegistrationTransactions

/api/v1/{division}/hrm/AbsenceRegistrationTransactions

/api/v1/{division}/hrm/AbsenceRegistrationTransactions

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AbsenceRegistration | False |  |  | Edm.Guid | Reference key to Absence Registration |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndTime | False |  |  | Edm.DateTime | End time on the last day of absence stored as DateTime, and the date should be ignored |
|  | ExpectedEndDate | False |  |  | Edm.DateTime | Expected end date of absence |
|  | Hours | False |  |  | Edm.Double | Differentiation of absence hours of the absence registration transaction between previous and current status |
|  | HoursFirstDay | False |  |  | Edm.Double | Hours of absence on the first day |
|  | HoursLastDay | False |  |  | Edm.Double | Hours of absence on the last day |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Extra information for absence |
|  | NotificationMoment | False |  |  | Edm.DateTime | Notification moment of absence |
|  | PercentageDisablement | False |  |  | Edm.Double | Percentage disablement |
|  | StartDate | False |  |  | Edm.DateTime | Start date of absence |
|  | StartTime | False |  |  | Edm.DateTime | Start time on the first day of absence stored as DateTime, and the date should be ignored |
|  | Status | False |  |  | Edm.Int16 | Status of absence, 0 = Open, 1 = Recovered |

## Returns

---

## Costcenters

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Costcenters

## Endpoint

Costcenters

## Good to know

Use this endpoint to create, read, update and delete Cost centres.

The code can only be changed in Exact Online by using the recode function.
For more information about the Cost analysis functionality in Exact Online, see Working with cost centres and cost units.

## Scope

Financial costcenters

## URI

/api/v1/{division}/hrm/Costcenters

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/hrm/Costcenters

/api/v1/{division}/hrm/Costcenters

/api/v1/{division}/hrm/Costcenters

/api/v1/{division}/hrm/Costcenters

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Active | False |  |  | Edm.Boolean | Obsolete |
|  | Code | True |  |  | Edm.String | Code (user-defined ID) |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint |
|  | Description | True |  |  | Edm.String | Description (text) |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | The end date by which the cost center has to be inactive |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |

## Returns

---

## Costunits

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Costunits

## Endpoint

Costunits

## Good to know

Use this endpoint to create, read, update and delete Cost units.

The code can only be changed in Exact Online by using the recode function.
For more information about the Cost analysis functionality in Exact Online, see Working with cost centres and cost units.

## Scope

Financial costcenters

## URI

/api/v1/{division}/hrm/Costunits

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/hrm/Costunits

/api/v1/{division}/hrm/Costunits

/api/v1/{division}/hrm/Costunits

/api/v1/{division}/hrm/Costunits

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | True |  |  | Edm.String | Code (user-defined) |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint |
|  | Description | True |  |  | Edm.String | Description (text) |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | The end date by which the cost unit has to be inactive |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |

## Returns

---

## Departments

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Departments

## Endpoint

Departments

## Good to know

Use this endpoint to read Departments.

Departments are used in Employment organizations and Active employments.
For more information about the HRM functionality in Exact Online, see Create and update departments.

This endpoint is available for the following packages:

- Payroll
- Professional Services (All)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/Departments

GET 
## Example usage

/api/v1/{division}/hrm/Departments

/api/v1/{division}/hrm/Departments

/api/v1/{division}/hrm/Departments

/api/v1/{division}/hrm/Departments

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | Department Code |
|  | Costcenter | False |  |  | Edm.String | Cost center Code |
|  | CostcenterDescription | False |  |  | Edm.String | Cost center description |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Department description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Explanation or extra information can be stored in the notes |

## Returns

---

## DivisionClasses

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - DivisionClasses

## Endpoint

DivisionClasses

## Good to know

This end point returns the possible choices per classification for a given company.

## Scope

Organization administration

## URI

/api/v1/{division}/hrm/DivisionClasses

GET 
## Example usage

/api/v1/{division}/hrm/DivisionClasses

/api/v1/{division}/hrm/DivisionClasses

/api/v1/{division}/hrm/DivisionClasses

/api/v1/{division}/hrm/DivisionClasses

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | ClassNameCustomer | False |  |  | Edm.Guid | Classification customer ID |
|  | ClassNameDescription | False |  |  | Edm.String | Related classification description |
|  | ClassNameID | False |  |  | Edm.Guid | Related classification ID |
|  | Code | False |  |  | Edm.String | Property code |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Property description |
|  | DescriptionTermID | False |  |  | Edm.Int32 | Property description term ID |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | SequenceNr | False |  |  | Edm.Int32 | Related classification sequence number |

## Returns

---

## DivisionClassNames

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - DivisionClassNames

## Endpoint

DivisionClassNames

## Good to know

Company classifications can be used to search for or filter on a specific company. This end point returns a list of those classifications.

## Scope

Organization administration

## URI

/api/v1/{division}/hrm/DivisionClassNames

GET 
## Example usage

/api/v1/{division}/hrm/DivisionClassNames

/api/v1/{division}/hrm/DivisionClassNames

/api/v1/{division}/hrm/DivisionClassNames

/api/v1/{division}/hrm/DivisionClassNames

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Customer | False |  |  | Edm.Guid | ID of customer |
|  | Description | False |  |  | Edm.String | Description of classification |
|  | DescriptionTermID | False |  |  | Edm.Int32 | Term ID of the classification |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | SequenceNr | False |  |  | Edm.Int32 | Sequence number |

## Returns

---

## DivisionClassValues

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - DivisionClassValues

## Endpoint

DivisionClassValues

## Good to know

This end point returns the values as used per company classification for a given company.

## Scope

Organization administration

## URI

/api/v1/{division}/hrm/DivisionClassValues

GET 
## Example usage

/api/v1/{division}/hrm/DivisionClassValues

/api/v1/{division}/hrm/DivisionClassValues

/api/v1/{division}/hrm/DivisionClassValues

/api/v1/{division}/hrm/DivisionClassValues

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Class_01 | False |  |  | Class_01 | First classification |
|  | Class_01_ID | False |  |  | Edm.Guid | First classification ID |
|  | Class_02 | False |  |  | Class_02 | Second classification |
|  | Class_02_ID | False |  |  | Edm.Guid | Second classification ID |
|  | Class_03 | False |  |  | Class_03 | Third classification |
|  | Class_03_ID | False |  |  | Edm.Guid | Third classification ID |
|  | Class_04 | False |  |  | Class_04 | Fourth classification |
|  | Class_04_ID | False |  |  | Edm.Guid | Fourth classification ID |
|  | Class_05 | False |  |  | Class_05 | Fifth classification |
|  | Class_05_ID | False |  |  | Edm.Guid | Fifth classification ID |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Customer | False |  |  | Edm.Guid | ID of customer |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |

## Returns

---

## Divisions

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Divisions

## Endpoint

Divisions

## Good to know

Returns only divisions that are accessible to the signed-in user, as configured in the user card under 'Companies: Access rights'. Accountants will only see divisions that belong to a single license (either their own or a client's), being the license that owns the division specified in the URI.
Please note that divisions returned are only those which the user has granted permission to.
Recommended alternative that is not limited to accessible divisions: /api/v1/{division}/system/AllDivisions
Recommended alternative that is not limited to a single license: /api/v1/{division}/system/Divisions

## Scope

-

## URI

/api/v1/{division}/hrm/Divisions

GET 
## Example usage

/api/v1/{division}/hrm/Divisions

/api/v1/{division}/hrm/Divisions

/api/v1/{division}/hrm/Divisions

/api/v1/{division}/hrm/Divisions

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Code | False |  |  | Edm.Int32 | Primary key |
|  | ArchiveDate | False |  |  | Edm.DateTime | Date on which the division is archived |
|  | BlockingStatus | False |  |  | Edm.Int32 | Values: 0 = Not blocked, 1 = Backup/restore, 2 = Conversion busy, 3 = Conversion shadow, 4 = Conversion waiting, 5 = Copy data waiting, 6 = Copy data busy |
|  | Class_01 | False |  |  | DivisionClasses | First division classification. User should have access rights to view division classifications. |
|  | Class_02 | False |  |  | DivisionClasses | Second division classification. User should have access rights to view division classifications. |
|  | Class_03 | False |  |  | DivisionClasses | Third division classification. User should have access rights to view division classifications. |
|  | Class_04 | False |  |  | DivisionClasses | Fourth division classification. User should have access rights to view division classifications. |
|  | Class_05 | False |  |  | DivisionClasses | Fifth division classification. User should have access rights to view division classifications. |
|  | Country | False |  |  | Edm.String | Country of the division. Is used for determination of legislation |
|  | CountryDescription | False |  |  | Edm.String | Description of Country |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of the creator |
|  | Currency | False |  |  | Edm.String | Default currency of the division |
|  | CurrencyDescription | False |  |  | Edm.String | Description of Currency |
|  | Customer | False |  |  | Edm.Guid | Owner account of the division |
|  | CustomerCode | False |  |  | Edm.String | Owner account code of the division |
|  | CustomerName | False |  |  | Edm.String | Owner account name of the division |
|  | Description | False |  |  | Edm.String | Description |
|  | HID | False |  |  | Edm.Int64 | Number that customers give to the division |
|  | Main | False |  |  | Edm.Boolean | True for the main (hosting) division |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of the last modifier |
|  | OBNumber | False |  |  | Edm.String | The soletrader VAT number used for offical returns to tax authority |
|  | SiretNumber | False |  |  | Edm.String | Siret Number of the division (France) |
|  | StartDate | False |  |  | Edm.DateTime | Date on which the division becomes active |
|  | Status | False |  |  | Edm.Int16 | Regular administrations will have status 0.  Currently, the only other possibility is 'archived' (1), which means the administration is not actively used, but still needs to be accessible for the customer/accountant to meet legal obligations |
|  | TaxOfficeNumber | False |  |  | Edm.String | Number of your local tax authority (Germany) |
|  | TaxReferenceNumber | False |  |  | Edm.String | Local tax reference number (Germany) |
|  | TemplateCode | False |  |  | Edm.String | Division template code |
|  | VATNumber | False |  |  | Edm.String | VAT number |
|  | Website | False |  |  | Edm.String | Customer value, hyperlink to external website |

## Returns

---

## JobGroups

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - JobGroups

## Endpoint

JobGroups

## Good to know

Use this endpoint to read Job groups.

Job groups are used to group Job titles.
For more information about the HRM functionality in Exact Online, see Working with job groups.

This endpoint is available for the following packages:

- Payroll
- Professional Services (All)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/JobGroups

GET 
## Example usage

/api/v1/{division}/hrm/JobGroups

/api/v1/{division}/hrm/JobGroups

/api/v1/{division}/hrm/JobGroups

/api/v1/{division}/hrm/JobGroups

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | Job group code |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Job group description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Explanation or extra information can be stored in the notes |

## Returns

---

## JobTitles

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - JobTitles

## Endpoint

JobTitles

## Good to know

Use this endpoint to read Job titles.

Job titles of employees are used in Employment organizations and Active employments.
For more information about the HRM functionality in Exact Online, see Working with job titles.

This endpoint is available for the following packages:

- Payroll
- Professional Services (All)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/JobTitles

GET 
## Example usage

/api/v1/{division}/hrm/JobTitles

/api/v1/{division}/hrm/JobTitles

/api/v1/{division}/hrm/JobTitles

/api/v1/{division}/hrm/JobTitles

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | Job title code |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Job title description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | JobCode | False |  |  | Edm.String | Reference job code |
|  | JobGroup | False |  |  | Edm.Guid | Group this job title belongs to |
|  | JobGroupCode | False |  |  | Edm.String | Job group code |
|  | JobGroupDescription | False |  |  | Edm.String | Job group description |
|  | JobLevelFrom | False |  |  | Edm.Int32 | Job title represents job level from |
|  | JobLevelTo | False |  |  | Edm.Int32 | Job title represents job level to |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Explanation or extra information can be stored in the notes |

## Returns

---

## LeaveAbsenceHoursByDay

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - LeaveAbsenceHoursByDay

## Endpoint

LeaveAbsenceHoursByDay

## Good to know

Use this endpoint to read employee's leave and absence hours by day.

The StartTime and EndTime properties will only be populated when the division is linked to Exact Officient.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/LeaveAbsenceHoursByDay

GET 
## Example usage

/api/v1/{division}/hrm/LeaveAbsenceHoursByDay

/api/v1/{division}/hrm/LeaveAbsenceHoursByDay

/api/v1/{division}/hrm/LeaveAbsenceHoursByDay

/api/v1/{division}/hrm/LeaveAbsenceHoursByDay

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Date | True |  |  | Edm.DateTime | Date of leave or absence |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | True |  |  | Edm.Guid | ID of employee linked to the leave or absence |
|  | EmployeeFullName | False |  |  | Edm.String | Employee full name |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | Employment | False |  |  | Edm.Guid | Employment ID |
|  | EmploymentHID | False |  |  | Edm.Int32 | Numeric ID of the employment |
|  | EndTime | False |  |  | Edm.DateTime | End time of leave or absence |
|  | ExternalIDInt | False |  |  | Edm.Int64 | Unique ID from external source. Eg. Exact Online HR |
|  | ExternalLeaveAbsenceType | False |  |  | Edm.Int64 | Unique leave or absence type from external source. Eg. Exact Online HR |
|  | Hours | True |  |  | Edm.Double | Hours of leave or absence |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | StartTime | False |  |  | Edm.DateTime | Start time of leave or absence |
|  | Status | True |  |  | Edm.Int16 | Status, 1 = Submitted, 2 = ApprovedNote: Submitted status is only applicable for Type = Leave |
|  | Type | True |  |  | Edm.Int16 | Type, 0 = Leave, 1 = AbsenceNote: Absence type is only allow for Status = Approved |

## Returns

---

## LeaveBuildUpRegistrations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - LeaveBuildUpRegistrations

## Endpoint

LeaveBuildUpRegistrations

## Good to know

Use this endpoint to read Leave build up registrations.

**Note:** In case the division is linked to Exact Officient, new leave build up registrations will not be available in Exact Online anymore.
 To see if a division is linked to Exact Officient, property IsHRDivision in /api/v1/{division}/system/Divisions can be used.

For more information about the HRM functionality in Exact Online, see View leave build up registrations.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/LeaveBuildUpRegistrations

GET 
## Example usage

/api/v1/{division}/hrm/LeaveBuildUpRegistrations

/api/v1/{division}/hrm/LeaveBuildUpRegistrations

/api/v1/{division}/hrm/LeaveBuildUpRegistrations

/api/v1/{division}/hrm/LeaveBuildUpRegistrations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Date | False |  |  | Edm.DateTime | Date of leave build up |
|  | Description | False |  |  | Edm.String | Description of leave build up |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee linked to the leave build up |
|  | EmployeeFullName | False |  |  | Edm.String | Employee full name |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | Hours | False |  |  | Edm.Double | Total number of leave build up hours |
|  | LeaveType | False |  |  | Edm.Guid | Type of leave |
|  | LeaveTypeCode | False |  |  | Edm.String | Code for type of leave |
|  | LeaveTypeDescription | False |  |  | Edm.String | Description for type of leave |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Extra information for leave build up |
|  | Status | False |  |  | Edm.Int16 | Status of leave build up, 1 = Submitted, 2 = Approved, 3 = Rejected |

## Returns

---

## LeaveRegistrations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - LeaveRegistrations

## Endpoint

LeaveRegistrations

## Good to know

Use this endpoint to read Leave registrations.

**Note:** In case the division is linked to Exact Officient, new leave registrations will not be available in Exact Online anymore. Instead, the leave hours per day are available. Please refer to /api/v1/{division}/HRM/LeaveAbsenceHoursByDay.
 To see if a division is linked to Exact Officient, property IsHRDivision in /api/v1/{division}/system/Divisions can be used.

For more information about the HRM functionality in Exact Online, see Work with leave and absence registrations.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/LeaveRegistrations

GET 
## Example usage

/api/v1/{division}/hrm/LeaveRegistrations

/api/v1/{division}/hrm/LeaveRegistrations

/api/v1/{division}/hrm/LeaveRegistrations

/api/v1/{division}/hrm/LeaveRegistrations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Description of leave |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee linked to the leave registration |
|  | EmployeeFullName | False |  |  | Edm.String | Employee full name |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | EndDate | False |  |  | Edm.DateTime | End date of leave |
|  | EndTime | False |  |  | Edm.DateTime | End time on the last day of leave stored as DateTime, and the date should be ignored |
|  | Hours | False |  |  | Edm.Double | Total number of leave hours |
|  | HoursFirstDay | False |  |  | Edm.Double | Hours of leave on the first day |
|  | HoursLastDay | False |  |  | Edm.Double | Hours of leave on the last day |
|  | LeaveType | False |  |  | Edm.Guid | Type of leave |
|  | LeaveTypeCode | False |  |  | Edm.String | Code for type of leave |
|  | LeaveTypeDescription | False |  |  | Edm.String | Description for type of leave |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Extra information for leave |
|  | StartDate | False |  |  | Edm.DateTime | Start date of leave |
|  | StartTime | False |  |  | Edm.DateTime | Start time on the first day of leave stored as DateTime, and the date should be ignored |
|  | Status | False |  |  | Edm.Int16 | Status of leave, 1 = Submitted, 2 = Approved, 3 = Rejected |

## Returns

---

## Schedules

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Schedules

## Endpoint

Schedules

## Good to know

Use this endpoint to read Schedules.

For more information about the Payroll functionality in Exact Online, see Working with employee's schedules.

This endpoint is available for the following packages:

- Payroll
- Professional Services (All)

## Scope

Hrm employees

## URI

/api/v1/{division}/hrm/Schedules

GET 
## Example usage

/api/v1/{division}/hrm/Schedules

/api/v1/{division}/hrm/Schedules

/api/v1/{division}/hrm/Schedules

/api/v1/{division}/hrm/Schedules

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Active | False |  |  | Edm.Byte | Obsolete |
|  | AverageHours | True |  |  | Edm.Double | Average hours per week in a schedulePlease be aware this property is mandatory if you use ScheduleType 1 or 2.For Time and Billing basic company, when creating a new schedule, the value is set to 0. When schedule entries are created, the BC will set the calculated value for Average hours per week. |
|  | BillabilityTarget | False |  |  | Edm.Double | Billability target |
|  | Code | False |  |  | Edm.String | Schedule code |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of the creator |
|  | Days | False |  |  | Edm.Double | Average days per week in the scheduleFor Time and Billing basic company, when creating a new schedule, the value is set to 0. When schedule entries are created, the BC will set the calculated value for Average days per week. |
|  | Description | False |  |  | Edm.String | Description of the schedule |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee ID of the schedule |
|  | EmployeeFullName | False |  |  | Edm.String | Employee full name of the schedule |
|  | Employment | True |  |  | Edm.Guid | Employment ID for schedule |
|  | EmploymentCLA | False |  |  | Edm.Guid | Employment CLA ID of the schedule |
|  | EmploymentHID | False |  |  | Edm.Int32 | Obsolete |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EndDate | False |  |  | Edm.DateTime | End date of the schedule |
|  | Hours | False |  |  | Edm.Double | Number of hours per week in a CLA for which the schedule is built |
|  | LeaveHoursCompensation | False |  |  | Edm.Double | Number of hours which are built up each week for later leaveFor Time and Billing basic company, the value is set to 0. |
|  | Main | False |  |  | Edm.Byte | Indication if the schedule is a main schedule for a CLA. 1 = Yes, 0 = No |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of the modifier |
|  | PaymentParttimeFactor | False |  |  | Edm.Double | Part-time factor for payroll calculation. Value between 0 and 1 |
|  | ScheduleEntries | False |  |  | ScheduleEntries | The collection of schedule entries |
|  | ScheduleType | True |  |  | Edm.Int32 | Type of schedule. 1 = Hours and average days, 2 = Hours and specific days, 3 = Hours per day, 4 = Time frames per day1 - Hours and average days, StartWeek will automatically set to 12 - Hours and specific days, StartWeek must be greater or equal to 1, AverageDaysPerWeek will automatically set to 03 - Hours per day, StartWeek must be greater or equal to 1, AverageHoursPerWeek and AverageDaysPerWeek will automatically set to 04 - Time frames per day, Hours per day, StartWeek must be greater or equal to 1, AverageHoursPerWeek and AverageDaysPerWeek will automatically set to 0Note: For Time and Billing basic company, the schedule type is automatically set to value "3 - Hour per day". |
|  | ScheduleTypeDescription | False |  |  | Edm.String | Description of the schedule type |
|  | StartDate | True |  |  | Edm.DateTime | Start date of the schedule |
|  | StartWeek | False |  |  | Edm.Int32 | Week to start the schedule from for an employee |

## Returns

---

## ActiveEmployments

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ActiveEmployments

## Endpoint

ActiveEmployments

## Good to know

Use this endpoint to read active employments.

This endpoint gives the basic information of the employee's employment that is active at this moment.
 An employment consists of multiple parts, like contract, organization and salary. For each, the detailed information can be read using the specifc endpoint.
For more information about the employments functionality in Exact Online, see Working with employees in Exact Online.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/ActiveEmployments

GET 
## Example usage

/api/v1/{division}/payroll/ActiveEmployments

/api/v1/{division}/payroll/ActiveEmployments

/api/v1/{division}/payroll/ActiveEmployments

/api/v1/{division}/payroll/ActiveEmployments

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AverageDaysPerWeek | False |  |  | Edm.Double | The average number of contract days that an employee works per week |
|  | AverageHoursPerWeek | False |  |  | Edm.Double | The average number of contract hours that an employee works per week |
|  | Contract | False |  |  | Edm.Guid | Employment contract ID |
|  | ContractDocument | False |  |  | Edm.Guid | Document ID of the employment contract |
|  | ContractEndDate | False |  |  | Edm.DateTime | End date of employment contract |
|  | ContractProbationEndDate | False |  |  | Edm.DateTime | Employment probation end date |
|  | ContractProbationPeriod | False |  |  | Edm.Int32 | Employment probation period |
|  | ContractStartDate | False |  |  | Edm.DateTime | Start date of employment contract |
|  | ContractType | False |  |  | Edm.Int32 | Type of employment contract. 1 - Definite, 2 - Indefinite, 3 - External |
|  | ContractTypeDescription | False |  |  | Edm.String | Description of employment contract type |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Department | False |  |  | Edm.Guid | Department of employee |
|  | DepartmentCode | False |  |  | Edm.String | Department code of employee |
|  | DepartmentDescription | False |  |  | Edm.String | Description of department |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee ID |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric number of Employee |
|  | EmploymentOrganization | False |  |  | Edm.Guid | Organization of employment |
|  | EndDate | False |  |  | Edm.DateTime | End date of employment |
|  | HID | False |  |  | Edm.Int32 | Numeric ID of the employment |
|  | HourlyWage | False |  |  | Edm.Double | Hourly wage |
|  | InternalRate | False |  |  | Edm.Double | Internal rate for time & billing or professional service user |
|  | Jobtitle | False |  |  | Edm.Guid | Job title of employee |
|  | JobtitleDescription | False |  |  | Edm.String | Description of job title |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | ReasonEnd | False |  |  | Edm.Int32 | ID of employment ended |
|  | ReasonEndDescription | False |  |  | Edm.String | Reason of end of employment |
|  | ReasonEndFlex | False |  |  | Edm.Int32 | Reason of ended flexible employment |
|  | ReasonEndFlexDescription | False |  |  | Edm.String | Other reason for end of employment |
|  | Salary | False |  |  | Edm.Guid | Employment salary |
|  | Schedule | False |  |  | Edm.Guid | Work schedule |
|  | ScheduleAverageHours | False |  |  | Edm.Double | Average hours per week in a schedule. |
|  | ScheduleCode | False |  |  | Edm.String | Work schedule code |
|  | ScheduleDays | False |  |  | Edm.Double | Number of days of work per week |
|  | ScheduleDescription | False |  |  | Edm.String | Description of work schedule |
|  | ScheduleHours | False |  |  | Edm.Double | Number of work hours per week. |
|  | StartDate | False |  |  | Edm.DateTime | Start date of employment |
|  | StartDateOrganization | False |  |  | Edm.DateTime | Start date of the employee in the organization. This field is used to count the years in service. |

## Returns

---

## Employees

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Employees

## Endpoint

Employees

## Good to know

Use this endpoint to read employees.

For more information about the employees functionality in Exact Online, see Working with employees in Exact Online.

This endpoint is available for the following packages:

- Payroll
- Time & Billing
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/Employees

GET 
## Example usage

/api/v1/{division}/payroll/Employees

/api/v1/{division}/payroll/Employees

/api/v1/{division}/payroll/Employees

/api/v1/{division}/payroll/Employees

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | ActiveEmployment | False |  |  | Edm.Byte | Obsolete |
|  | AddressLine2 | False |  |  | Edm.String | Second address lineNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | AddressLine3 | False |  |  | Edm.String | Third address lineNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | AddressStreet | False |  |  | Edm.String | Street of addressNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | AddressStreetNumber | False |  |  | Edm.String | Street number of addressNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | AddressStreetNumberSuffix | False |  |  | Edm.String | Street number suffix of addressNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | BirthDate | False |  |  | Edm.DateTime | Birth dateNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | BirthName | False |  |  | Edm.String | Birth name |
|  | BirthNamePrefix | False |  |  | Edm.String | Birth middle name |
|  | BirthPlace | False |  |  | Edm.String | Birth placeNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | BusinessEmail | False |  |  | Edm.String | Email of the employee at the office |
|  | BusinessFax | False |  |  | Edm.String | Fax number of the employee at the office |
|  | BusinessMobile | False |  |  | Edm.String | Office mobile number of the employee |
|  | BusinessPhone | False |  |  | Edm.String | Phone number of the employee at the office |
|  | BusinessPhoneExtension | False |  |  | Edm.String | Phone extension of the employee at the office |
|  | CASONumber | False |  |  | Edm.String | Obsolete |
|  | City | False |  |  | Edm.String | CityNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Code | False |  |  | Edm.String | Code of the employee |
|  | Country | False |  |  | Edm.String | Country codeNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Customer | False |  |  | Edm.Guid | Customer ID |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Email | False |  |  | Edm.String | Page: User maintenance page; Section: PersonalE-mail address of a user. If employee is linked to a user, the user email is stored in this property.Note:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employeesUsers created in Exact Online can access the company or companies in an administration. |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number |
|  | EndDate | False |  |  | Edm.DateTime | End date of the employee |
|  | FirstName | False |  |  | Edm.String | First name of the employee |
|  | FullName | False |  |  | Edm.String | Full name of the employee |
|  | Gender | False |  |  | Edm.String | Gender |
|  | HID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | Initials | False |  |  | Edm.String | Initials |
|  | IsActive | False |  |  | Edm.Boolean | IsActive |
|  | IsAnonymised | False |  |  | Edm.Byte | Indicates whether the employee is anonymised. |
|  | Language | False |  |  | Edm.String | Language code |
|  | LastName | False |  |  | Edm.String | Last name |
|  | LocationDescription | False |  |  | Edm.String | Description of the location of the employee (where am I?) |
|  | Manager | False |  |  | Edm.Guid | Direct manager of the employeeNote:  The manager must  be in the same division as the employeeThe manager should not  be subordinate of their employee |
|  | MaritalDate | False |  |  | Edm.DateTime | Date of marriageNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | MaritalStatus | False |  |  | Edm.Int16 | Marital statusNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | MiddleName | False |  |  | Edm.String | Middle name |
|  | Mobile | False |  |  | Edm.String | Mobile phoneNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Municipality | False |  |  | Edm.String | Obsolete |
|  | NameComposition | False |  |  | Edm.Int16 |  |
|  | Nationality | False |  |  | Edm.String | NationalityNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | NickName | False |  |  | Edm.String | Nick name |
|  | Notes | False |  |  | Edm.String | Additional notes |
|  | PartnerName | False |  |  | Edm.String | Name of partnerNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | PartnerNamePrefix | False |  |  | Edm.String | Middle name of partnerNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Person | False |  |  | Edm.Guid | Reference to the persons table in which the personal data of the employee is stored |
|  | Phone | False |  |  | Edm.String | Phone numberNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | PhoneExtension | False |  |  | Edm.String | Phone number extensionNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Picture | False |  |  | Edm.Binary | Bytes of the logo image |
|  | PictureFileName | False |  |  | Edm.String | Filename of picture |
|  | PictureThumbnailUrl | False |  |  | Edm.String | Thumbnail url of the picture |
|  | PictureUrl | False |  |  | Edm.String | Url of picture |
|  | Postcode | False |  |  | Edm.String | PostcodeNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | PrivateEmail | False |  |  | Edm.String | Section: Personal Personal e-mail address of the employee.Note:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | SocialSecurityNumber | False |  |  | Edm.String | Social security numberNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the employee |
|  | State | False |  |  | Edm.String | StateNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | TaxIdentificationNumber | False |  |  | Edm.String | Tax identification numberNote:  The value is only returned if user has any of the following roles: View userEnter variable payroll mutationsManage employeesAnonymise employee and userView personal information Of employees |
|  | Title | False |  |  | Edm.String | Title |
|  | User | False |  |  | Edm.Guid | User ID of employee |
|  | UserFullName | False |  |  | Edm.String | Name of user |

## Returns

---

## EmploymentConditionGroups

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentConditionGroups

## Endpoint

EmploymentConditionGroups

## Good to know

Use this endpoint to read employment conditions groups.

Employment conditions groups contain components that define the employment conditions.
 A division's employment conditions group is based on a predefined collective agreement.

 This endpoint gives the basic information of the employment conditions group.
For more information about the employment conditions groups functionality in Exact Online, see Work with employment conditions groups.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Beta

This endpoint is no longer in beta, but due to the impact on current customers the URL will keep the beta part in it for now.

## Scope

Hrm payroll

## URI

/api/v1/beta/{division}/payroll/EmploymentConditionGroups

GET 
## Example usage

/api/v1/beta/{division}/payroll/EmploymentConditionGroups

/api/v1/beta/{division}/payroll/EmploymentConditionGroups

/api/v1/beta/{division}/payroll/EmploymentConditionGroups

/api/v1/beta/{division}/payroll/EmploymentConditionGroups

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | CLACodeTaxOffice | False |  |  | Edm.String | CLA code tax office |
|  | CLACodeTaxOfficeDescription | False |  |  | Edm.String | CLA code tax office description |
|  | Code | False |  |  | Edm.String | Code |
|  | Created | False |  |  | Edm.DateTime | Created |
|  | Creator | False |  |  | Edm.Guid | Creator |
|  | CreatorFullName | False |  |  | Edm.String | Creator full name |
|  | Description | False |  |  | Edm.String | Description |
|  | Division | False |  |  | Edm.Int32 | Division |
|  | EndDate | False |  |  | Edm.DateTime | End date |
|  | HoursPerWeek | False |  |  | Edm.Double | Hours per week |
|  | Modified | False |  |  | Edm.DateTime | Modified |
|  | Modifier | False |  |  | Edm.Guid | Modifier |
|  | ModifierFullName | False |  |  | Edm.String | Modifier full name |
|  | SBICode | False |  |  | Edm.String | SBI code |
|  | SBICodeDescription | False |  |  | Edm.String | SBI code description |
|  | StartDate | False |  |  | Edm.DateTime | Start date |

## Returns

---

## EmploymentContractFlexPhases

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentContractFlexPhases

## Endpoint

EmploymentContractFlexPhases

## Good to know

Use this endpoint to read employment contract flex phases.

An employment contract flex phase is used for flexworkers to indicate the phase in which the income ratio is, in context of the 'Wet Flexibiliteit en Zekerheid'.
 With the tax authority this phase is known as 'Code fase indeling F&Z'.

 The phase is set in the employment contract, that can be read using the EmploymentContracts endpoint.

 This API has been deprecated and only returns the employment contract flex phases that were active before 2022. Please Use the EmploymentContractFlexPhasesOnFocusDate for payroll year 2022 and onwards.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentContractFlexPhases

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentContractFlexPhases

/api/v1/{division}/payroll/EmploymentContractFlexPhases

/api/v1/{division}/payroll/EmploymentContractFlexPhases

/api/v1/{division}/payroll/EmploymentContractFlexPhases

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | Description | False |  |  | Edm.String | Flexible employment contract phase description |

## Returns

---

## EmploymentContractFlexPhasesOnFocusDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentContractFlexPhasesOnFocusDate

## Endpoint

EmploymentContractFlexPhasesOnFocusDate

## Good to know

Use this endpoint to read employment contract flex phases on focus date.

The phase is set in the employment contract, that can be read using the EmploymentContracts endpoint.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## Function URI

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

GET 
## Example usage

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Code | False |  |  | Edm.Int32 | Code used to declare employment contract flex phase code to the Dutch Tax Authority |
|  | Description | False |  |  | Edm.String | Flexible employment contract phase description |
|  | EndDate | False |  |  | Edm.DateTime | End date of the employment contract flex phase |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the employment contract flex phase |

## Returns

Collection(Exact.Web.Api.Models.Payroll.EmploymentContractFlexPhasesOnFocusDate)

---

## EmploymentContractFlexPhasesOnFocusDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentContractFlexPhasesOnFocusDate

## Endpoint

EmploymentContractFlexPhasesOnFocusDate

## Good to know

Use this endpoint to read employment contract flex phases on focus date.

The phase is set in the employment contract, that can be read using the EmploymentContracts endpoint.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## Function URI

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

GET 
## Example usage

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

/api/v1/{division}/read/payroll/EmploymentContractFlexPhasesOnFocusDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Code | False |  |  | Edm.Int32 | Code used to declare employment contract flex phase code to the Dutch Tax Authority |
|  | Description | False |  |  | Edm.String | Flexible employment contract phase description |
|  | EndDate | False |  |  | Edm.DateTime | End date of the employment contract flex phase |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the employment contract flex phase |

## Returns

Collection(Exact.Web.Api.Models.Payroll.EmploymentContractFlexPhasesOnFocusDate)

---

## EmploymentContracts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentContracts

## Endpoint

EmploymentContracts

## Good to know

Use this endpoint to read employment contracts.

The employment contract contains the basic information about the employee's contract.
For more information about the employment contracts functionality in Exact Online, see Modify an employee's contract.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentContracts

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentContracts

/api/v1/{division}/payroll/EmploymentContracts

/api/v1/{division}/payroll/EmploymentContracts

/api/v1/{division}/payroll/EmploymentContracts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | ContractFlexPhase | False |  |  | Edm.Int32 | Flexible employment contract phase |
|  | ContractFlexPhaseDescription | False |  |  | Edm.String | Flexible employment contract phase description. |
|  | CreateAutoCorrection | False |  |  | Edm.Boolean | Confirmation: Create Auto CorrectionWhen the 'payroll run' already finalized and the update is made to the employment contract start date, the system will first block the PUT action with the message below.	With the 'PayrollCorrection' right, the error message below will be thrown:					 This change will lead to a recalculation of previous periods. A correction request will be created with the following data:			  Activation date: 01-01-2019			  Payroll year: 2019			  Period: 1			 If you are confirmed want to proceed, set the [CreateAutoCorrection] to True and re-submit the request.				Without the 'PayrollCorrection' right, the error message below will be thrown:		 You do not have rights to change data that can influence processed payroll transactions.	Note : If you delete this contract in an already calculated period, auto corrections will be created for this employee. |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | CreatePredecessorsForLinkedAgencies | False |  |  | Edm.Boolean | Confirmation: Create Predecessors For Linked AgenciesThe system will block the POST/PUT action when one of the condition below fulfilled:						When create (POST) a new successor, the employment contract successor start date is set to an earlier payroll year.			When update (PUT) the existing employment contract start date to an earlier payroll year.				The error message below will be thrown:							 Attention: If you change the start date to an earlier payroll year, predecessors will be created for linked agencies.				 You will have to check if the data of the predecessors is correct.				 If you are confirmed want to proceed, set the [CreatePredecessorsForLinkedAgencies] to True and re-submit the request. |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Document | False |  |  | Edm.Guid | Document ID of the employment contract |
|  | Employee | False |  |  | Edm.Guid | ID of employee |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | EmployeeType | False |  |  | Edm.Int32 | Type of employee. 1 - Employee, 2 - Contractor, 3 - Temporary, 4 - Student, 5 - Flexworker |
|  | EmployeeTypeDescription | False |  |  | Edm.String | Employee type description |
|  | Employment | True |  |  | Edm.Guid | Employment ID |
|  | EmploymentHID | False |  |  | Edm.Int32 | Obsolete |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EndDate | False |  |  | Edm.DateTime | End date of employment contract |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Obsolete |
|  | ProbationEndDate | False |  |  | Edm.DateTime | Employment probation end date |
|  | ProbationPeriod | False |  |  | Edm.Int32 | Employment probation period |
|  | ProbationPeriodDescription | False |  |  | Edm.String | Contract probation period description |
|  | ReasonContract | False |  |  | Edm.Int32 | Employment contract reason code. 1 - New employment, 2 - Employment change, 3 - New legal employer, 4 - Acquisition 5 - Previous contract expired, 6 - Other |
|  | ReasonContractDescription | False |  |  | Edm.String | Employment contract reason description |
|  | Sequence | False |  |  | Edm.Int32 | Sequence number |
|  | StartDate | False |  |  | Edm.DateTime | Start date of employment contractNote : Be aware that for PUT, when you use a start date in the past it will also update years in service to this date. |
|  | Type | False |  |  | Edm.Int32 | Type of employment contract. 1 - Definite, 2 - Indefinite, 3 - External |
|  | TypeDescription | False |  |  | Edm.String | Description of employment contract type |

## Returns

---

## EmploymentEndReasons

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentEndReasons

## Endpoint

EmploymentEndReasons

## Good to know

Use this endpoint to read employment end reasons.

The reason is set when the employment is ended. This API has been deprecated and only returns the employment end reasons that were active before 2020. Use the EmploymentEndReasonsOnFocusDate for payroll year 2020 and onwards.
For more information about the employments functionality in Exact Online, see End an employee's contract.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentEndReasons

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentEndReasons

/api/v1/{division}/payroll/EmploymentEndReasons

/api/v1/{division}/payroll/EmploymentEndReasons

/api/v1/{division}/payroll/EmploymentEndReasons

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | Description | False |  |  | Edm.String | Employment end reason description |

## Returns

---

## EmploymentEndReasonsOnFocusDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentEndReasonsOnFocusDate

## Endpoint

EmploymentEndReasonsOnFocusDate

## Good to know

Use this endpoint to read employment end reasons on focus date.

The reason is set when the employment is ended. Use this end point from payroll year 2020 and onwards.
For more information about the employments functionality in Exact Online, see End an employee's contract.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## Function URI

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

GET 
## Example usage

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Code | False |  |  | Edm.String | Code used to declare the employment end reason to the Dutch Tax Authority |
|  | Description | False |  |  | Edm.String | Employment end reason description |
|  | EndDate | False |  |  | Edm.DateTime | End date of the employment end reason |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the employment end reason |

## Returns

Collection(Exact.Web.Api.Models.Payroll.EmploymentEndReasonsOnFocusDate)

---

## EmploymentEndReasonsOnFocusDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentEndReasonsOnFocusDate

## Endpoint

EmploymentEndReasonsOnFocusDate

## Good to know

Use this endpoint to read employment end reasons on focus date.

The reason is set when the employment is ended. Use this end point from payroll year 2020 and onwards.
For more information about the employments functionality in Exact Online, see End an employee's contract.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## Function URI

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

GET 
## Example usage

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

/api/v1/{division}/read/payroll/EmploymentEndReasonsOnFocusDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Code | False |  |  | Edm.String | Code used to declare the employment end reason to the Dutch Tax Authority |
|  | Description | False |  |  | Edm.String | Employment end reason description |
|  | EndDate | False |  |  | Edm.DateTime | End date of the employment end reason |
|  | ID | False |  |  | Edm.Int32 | Primary key |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the employment end reason |

## Returns

Collection(Exact.Web.Api.Models.Payroll.EmploymentEndReasonsOnFocusDate)

---

## EmploymentOrganizations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentOrganizations

## Endpoint

EmploymentOrganizations

## Good to know

Use this endpoint to read employment organizations.

The employment organization contains the basic information about the employee's organizational data, like job title and department.
For more information about the employment organizations functionality in Exact Online, see Maintenance organization.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentOrganizations

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentOrganizations

/api/v1/{division}/payroll/EmploymentOrganizations

/api/v1/{division}/payroll/EmploymentOrganizations

/api/v1/{division}/payroll/EmploymentOrganizations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | CostCenter | False |  |  | Edm.String | Cost center code |
|  | CostCenterDescription | False |  |  | Edm.String | Description of cost center |
|  | CostUnit | False |  |  | Edm.String | Cost unit code |
|  | CostUnitDescription | False |  |  | Edm.String | Description of cost unit |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Department | True |  |  | Edm.Guid | ID of department |
|  | DepartmentCode | False |  |  | Edm.String | Department code |
|  | DepartmentDescription | False |  |  | Edm.String | Department description for organization |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | ID of employee |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | Employment | True |  |  | Edm.Guid | Employment ID |
|  | EmploymentHID | False |  |  | Edm.Int32 | Obsolete |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EndDate | False |  |  | Edm.DateTime | Organization end dateNote : This property only supported for successor |
|  | JobTitle | True |  |  | Edm.Guid | ID of job title |
|  | JobTitleCode | False |  |  | Edm.String | Job title code |
|  | JobTitleDescription | False |  |  | Edm.String | Job title description |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | Notes | False |  |  | Edm.String | Obsolete |
|  | StartDate | False |  |  | Edm.DateTime | Organization start dateNote : This property only supported for successor |

## Returns

---

## Employments

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Employments

## Endpoint

Employments

## Good to know

Use this endpoint to read employments.

This endpoint gives the basic information of the employee's employment.
 An employment consists of multiple parts, like contract, organization and salary. For each, the detailed information can be read using the specifc endpoint.

 To get the active employments only, the endpoint ActiveEmployments can be used.
For more information about the employments functionality in Exact Online, see Working with employees in Exact Online.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/Employments

GET 
## Example usage

/api/v1/{division}/payroll/Employments

/api/v1/{division}/payroll/Employments

/api/v1/{division}/payroll/Employments

/api/v1/{division}/payroll/Employments

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee ID |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric number of Employee |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EndDate | False |  |  | Edm.DateTime | End date of employment |
|  | HID | False |  |  | Edm.Int32 | Obsolete |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | ReasonEnd | False |  |  | Edm.Int32 | ID of employment ended |
|  | ReasonEndDescription | False |  |  | Edm.String | Reason of end of employment |
|  | ReasonEndFlex | False |  |  | Edm.Int32 | Reason of ended flexible employment |
|  | ReasonEndFlexDescription | False |  |  | Edm.String | Other reason for end of employment |
|  | StartDate | False |  |  | Edm.DateTime | Start date of employment |
|  | StartDateOrganization | False |  |  | Edm.DateTime | Start date of the employee in the organization. This field is used to count the years in service.Note: For PUT, this property will update the start date years in service for all employments of this employee |

## Returns

---

## EmploymentSalaries

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentSalaries

## Endpoint

EmploymentSalaries

## Good to know

Use this endpoint to read employment salaries.

The employment salary contains the basic information about the employee's salary, like full and parttime salary, hourly wage and scale.
For more information about the employment salaries functionality in Exact Online, see Modify an employee's salary or rate.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentSalaries

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentSalaries

/api/v1/{division}/payroll/EmploymentSalaries

/api/v1/{division}/payroll/EmploymentSalaries

/api/v1/{division}/payroll/EmploymentSalaries

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AmountType | False |  |  | Edm.Int16 | Salary Section: Salary typeValue: 0 - Gross, 1 - Net. |
|  | AmountTypeDescription | False |  |  | Edm.String | Salary Section: Salary type descriptionWhen AmountType value is 0, return 'Gross'When AmountType value 1, return 'Net' |
|  | AutoCorrection | False |  |  | Edm.Boolean | Confirmation: Create Auto CorrectionWhen the 'payroll run' already finalized and the update is made to the employment salary amount, the system will first block the PUT action with the message below.	With the 'PayrollCorrection' right, the error message below will be thrown:					 This change will lead to a recalculation of previous periods. A correction request will be created with the following data:			  Activation date: 01-01-2019			  Payroll year: 2019			  Period: 1			 If you are confirmed want to proceed, set the [AutoCorrection] to True and re-submit the request.				Without the 'PayrollCorrection' right, the error message below will be thrown:		 You do not have rights to change data that can influence processed payroll transactions.	Note : If you delete this salary in an already calculated period, auto corrections will be created for this employee. |
|  | AverageDaysPerWeek | False |  |  | Edm.Double | The average number of contract days that an employee works per week |
|  | AverageHoursPerWeek | False |  |  | Edm.Double | The average number of contract hours that an employee works per week |
|  | BillabilityTarget | False |  |  | Edm.Double | Schedule Section: Billability target |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | General section: Custom description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee ID |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number |
|  | Employment | False |  |  | Edm.Guid | Employment |
|  | EmploymentHID | False |  |  | Edm.Int32 | Obsolete |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EmploymentSalaryType | False |  |  | Edm.Int32 | Salary type of employment. 1 - Periodical (fixed), 2 - Per hour (variable) |
|  | EmploymentSalaryTypeDescription | False |  |  | Edm.String | Salary type description |
|  | EndDate | False |  |  | Edm.DateTime | Salary record end dateNote : This property only supported for successor. |
|  | ExternalRate | False |  |  | Edm.Double | Rate Section: External rate |
|  | Frequency | False |  |  | Edm.Int32 | Frequency: 1 - Yearly, 2 - Quarterly, 3 - Monthly, 4 - 4-weekly, 5 - Weekly, 11 - Yearly (Pro forma), 12 - Quarterly (Pro forma), 13 - Monthly (Pro forma), 14 - 4-Weekly (Pro forma), 15 - Weekly (Pro forma) |
|  | FrequencyDescription | False |  |  | Edm.String | Payroll period frequency description |
|  | FulltimeAmount | False |  |  | Edm.Double | Salary when working fulltime |
|  | HourlyWage | False |  |  | Edm.Double | Hourly wage |
|  | IntercompanyRate | False |  |  | Edm.Double | Rate Section: Intercompany rate |
|  | InternalRate | False |  |  | Edm.Double | Internal rate for time & billing or professional service user |
|  | JobLevel | False |  |  | Edm.Int32 | Employee job level in context of a wage scale |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | ParttimeAmount | False |  |  | Edm.Double | Salary when working parttime |
|  | ParttimeFactor | False |  |  | Edm.Double | Contract hours / Fulltime contract hours |
|  | SalaryBasedType | False |  |  | Edm.Int32 | Salary Section: Salary based on.Value: 0 - Manual entry, 1 - Wagescale, 2 - Minimum wage, 3 - Minimum hourly wage |
|  | SalaryBasedTypeDescription | False |  |  | Edm.String | When SalaryBasedType value is 0, return 'Manual entry'When SalaryBasedType value 1, return 'Wage scale'When SalaryBasedType value 2, return 'Minimum wage'When SalaryBasedType value 3, return 'Minimum hourly wage' |
|  | Scale | False |  |  | Edm.String | Employee wage scale |
|  | Schedule | False |  |  | Edm.Guid | Employment schedule |
|  | ScheduleCode | False |  |  | Edm.String | Employment schedule code |
|  | ScheduleDescription | False |  |  | Edm.String | Description of employment schedule |
|  | StartDate | False |  |  | Edm.DateTime | Salary record start dateNote : This property only supported for successor. |
|  | WageScale | False |  |  | Edm.Guid | Salary Section: Wagescale ID |
|  | WageScalePeriod | False |  |  | Edm.Int16 | Salary Section: Period for automatic step increase |
|  | WageScaleStep | False |  |  | Edm.String | Salary Section: Wagescale Step Code |

## Returns

---

## EmploymentTaxAuthoritiesGeneral

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentTaxAuthoritiesGeneral

## Endpoint

EmploymentTaxAuthoritiesGeneral

## Good to know

Use this endpoint to read the general data from the employees tax authority.

The employment tax authorities general contains the general information about the employee's tax authority, like payroll tax number, type of income, nature of work relationship, influence insurance obligation and etc.
For more information about the employment tax authorities general functionality in Exact Online, see Payroll | Adjust employee tax information.

This endpoint is available for the following packages:

- Payroll

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/EmploymentTaxAuthoritiesGeneral

GET 
## Example usage

/api/v1/{division}/payroll/EmploymentTaxAuthoritiesGeneral

/api/v1/{division}/payroll/EmploymentTaxAuthoritiesGeneral

/api/v1/{division}/payroll/EmploymentTaxAuthoritiesGeneral

/api/v1/{division}/payroll/EmploymentTaxAuthoritiesGeneral

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | False |  |  | Edm.Guid | ID of the account |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee ID |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number |
|  | Employment | False |  |  | Edm.Guid | Employment |
|  | EmploymentHID | False |  |  | Edm.Int32 | Obsolete |
|  | EmploymentNumber | False |  |  | Edm.Int32 | Employment number |
|  | EndDate | False |  |  | Edm.DateTime | End date of employment agencies |
|  | InfluenceInsuranceObligation | False |  |  | Edm.String | Influence insurance obligation |
|  | InfluenceInsuranceObligationDescription | False |  |  | Edm.String | Influence insurance obligation description |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | NatureOfWorkRelationship | False |  |  | Edm.String | Nature of work relationship |
|  | NatureOfWorkRelationshipDescription | False |  |  | Edm.String | Nature of work relationship description |
|  | PayrollTaxesNumber | False |  |  | Edm.String | Payroll taxes number |
|  | StartDate | False |  |  | Edm.DateTime | Start date of employment agencies |
|  | TypeOfIncome | False |  |  | Edm.String | Type of income |
|  | TypeOfIncomeDescription | False |  |  | Edm.String | Type of income description |

## Returns

---

## PayrollComponents

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - PayrollComponents

## Endpoint

PayrollComponents

## Good to know

Use this endpoint to read payroll components.

This endpoint gives a list of payroll components that are part of the specified employment conditions group.
For more information about the payrol components functionality in Exact Online, see Work with payroll components.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Beta

This endpoint is no longer in beta, but due to the impact on current customers the URL will keep the beta part in it for now.

## Scope

Hrm payroll

## Function URI

/api/v1/beta/{division}/payroll/PayrollComponents

GET 
## Example usage

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID |
|  | Calculate | False |  |  | Edm.Byte | Calculate |
|  | Category | False |  |  | Edm.String | Category |
|  | CategoryDescription | False |  |  | Edm.String | Category description |
|  | Code | False |  |  | Edm.String | Code |
|  | Created | False |  |  | Edm.DateTime | Created |
|  | Creator | False |  |  | Edm.Guid | Creator |
|  | CreatorFullName | False |  |  | Edm.String | Creator full name |
|  | Description | False |  |  | Edm.String | Description |
|  | Division | False |  |  | Edm.Int32 | Division |
|  | EmploymentConditionGroupCode | False |  |  | Edm.String | Employment condition group code |
|  | EmploymentConditionGroupDescription | False |  |  | Edm.String | Employment condition group description |
|  | EndDate | False |  |  | Edm.DateTime | End date |
|  | GLClassification | False |  |  | Edm.String | GL classification |
|  | GLClassificationDescription | False |  |  | Edm.String | GL classification description |
|  | Modified | False |  |  | Edm.DateTime | Modified |
|  | Modifier | False |  |  | Edm.Guid | Modifier |
|  | ModifierFullName | False |  |  | Edm.String | Modifier full name |
|  | PensionDeclarationClassification | False |  |  | Edm.String | Pension declaration classification |
|  | PensionDeclarationClassificationDescription | False |  |  | Edm.String | Pension declaration classification description |
|  | PensionDeclarationSubclassification | False |  |  | Edm.String | Pension declaration subclassification |
|  | PensionDeclarationSubclassificationDescription | False |  |  | Edm.String | Pension declaration subclassification description |
|  | SearchCode | False |  |  | Edm.String | Search code |
|  | StartDate | False |  |  | Edm.DateTime | Start date |
|  | Subcategory | False |  |  | Edm.String | Subcategory |
|  | SubcategoryDescription | False |  |  | Edm.String | Subcategory description |
|  | TaxDeclarationClassification | False |  |  | Edm.String | Tax declaration classification |
|  | TaxDeclarationClassificationDescription | False |  |  | Edm.String | Tax declaration classification description |
|  | TransactionType | False |  |  | Edm.Int16 | Transaction type: 1 - Normal, 2- Special, 3 - Normal and special |
|  | Type | False |  |  | Edm.Int32 | Type: 1 - Allowance, 2- Deduction, 3 - Subtotal |
|  | WageListClassification | False |  |  | Edm.String | Wage list classification |
|  | WageListClassificationDescription | False |  |  | Edm.String | Wage list classification description |

## Returns

---

## PayrollComponents - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - PayrollComponents

## Endpoint

PayrollComponents

## Good to know

Use this endpoint to read payroll components.

This endpoint gives a list of payroll components that are part of the specified employment conditions group.
For more information about the payrol components functionality in Exact Online, see Work with payroll components.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Beta

This endpoint is no longer in beta, but due to the impact on current customers the URL will keep the beta part in it for now.

## Scope

Hrm payroll

## Function URI

/api/v1/beta/{division}/payroll/PayrollComponents

GET 
## Example usage

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

/api/v1/beta/{division}/payroll/PayrollComponents

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID |
|  | Calculate | False |  |  | Edm.Byte | Calculate |
|  | Category | False |  |  | Edm.String | Category |
|  | CategoryDescription | False |  |  | Edm.String | Category description |
|  | Code | False |  |  | Edm.String | Code |
|  | Created | False |  |  | Edm.DateTime | Created |
|  | Creator | False |  |  | Edm.Guid | Creator |
|  | CreatorFullName | False |  |  | Edm.String | Creator full name |
|  | Description | False |  |  | Edm.String | Description |
|  | Division | False |  |  | Edm.Int32 | Division |
|  | EmploymentConditionGroupCode | False |  |  | Edm.String | Employment condition group code |
|  | EmploymentConditionGroupDescription | False |  |  | Edm.String | Employment condition group description |
|  | EndDate | False |  |  | Edm.DateTime | End date |
|  | GLClassification | False |  |  | Edm.String | GL classification |
|  | GLClassificationDescription | False |  |  | Edm.String | GL classification description |
|  | Modified | False |  |  | Edm.DateTime | Modified |
|  | Modifier | False |  |  | Edm.Guid | Modifier |
|  | ModifierFullName | False |  |  | Edm.String | Modifier full name |
|  | PensionDeclarationClassification | False |  |  | Edm.String | Pension declaration classification |
|  | PensionDeclarationClassificationDescription | False |  |  | Edm.String | Pension declaration classification description |
|  | PensionDeclarationSubclassification | False |  |  | Edm.String | Pension declaration subclassification |
|  | PensionDeclarationSubclassificationDescription | False |  |  | Edm.String | Pension declaration subclassification description |
|  | SearchCode | False |  |  | Edm.String | Search code |
|  | StartDate | False |  |  | Edm.DateTime | Start date |
|  | Subcategory | False |  |  | Edm.String | Subcategory |
|  | SubcategoryDescription | False |  |  | Edm.String | Subcategory description |
|  | TaxDeclarationClassification | False |  |  | Edm.String | Tax declaration classification |
|  | TaxDeclarationClassificationDescription | False |  |  | Edm.String | Tax declaration classification description |
|  | TransactionType | False |  |  | Edm.Int16 | Transaction type: 1 - Normal, 2- Special, 3 - Normal and special |
|  | Type | False |  |  | Edm.Int32 | Type: 1 - Allowance, 2- Deduction, 3 - Subtotal |
|  | WageListClassification | False |  |  | Edm.String | Wage list classification |
|  | WageListClassificationDescription | False |  |  | Edm.String | Wage list classification description |

## Returns

---

## PayrollTransactionsByPayrollYear

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - PayrollTransactionsByPayrollYear

## Endpoint

PayrollTransactionsByPayrollYear

## Good to know

This bulk service has a page size of 1000.

 Only the following filters are supported for this endpoint:
 Employment, Frequency, PayrollComponent, PayrollYear, Period, Status

## Beta

This endpoint is no longer in beta, but due to the impact on current customers the URL will keep the beta part in it for now.

## Scope

Hrm payroll

## Function URI

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

GET 
## Example usage

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Transaction |
|  | CalculatedAmount | False |  |  | Edm.Double | Calculated amount |
|  | CalculatedBaseValue | False |  |  | Edm.Double | Calculated base value |
|  | CalculatedFranchise | False |  |  | Edm.Double | Calculated franchise |
|  | CalculatedMaximum | False |  |  | Edm.Double | Calculated maximum |
|  | CalculatedNumber | False |  |  | Edm.Double | Calculated number |
|  | CostCenter | False |  |  | Edm.String | Cost center |
|  | CostCenterCode | False |  |  | Edm.String | Cost center code |
|  | CostCenterDescription | False |  |  | Edm.String | Cost center description |
|  | CostUnit | False |  |  | Edm.String | Cost unit |
|  | CostUnitCode | False |  |  | Edm.String | Cost unit code |
|  | CostUnitDescription | False |  |  | Edm.String | Cost unit description |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | Creator |
|  | CreatorFullName | False |  |  | Edm.String | Creator full name |
|  | Date | False |  |  | Edm.DateTime | Date |
|  | Department | False |  |  | Edm.Guid | Department |
|  | DepartmentCode | False |  |  | Edm.String | Department code |
|  | DepartmentDescription | False |  |  | Edm.String | Department description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number |
|  | Employment | False |  |  | Edm.Guid | Employment |
|  | EmploymentConditionGroup | False |  |  | Edm.Guid | Employment condition group |
|  | EmploymentConditionGroupCode | False |  |  | Edm.String | Employment condition group code |
|  | EmploymentConditionGroupDescription | False |  |  | Edm.String | Employment condition group description |
|  | EntryAmount | False |  |  | Edm.Double | Entry amount |
|  | EntryBase | False |  |  | Edm.Double | Entry base |
|  | EntryNumber | False |  |  | Edm.Double | Entry number |
|  | EntryPercentage | False |  |  | Edm.Double | Entry percentage |
|  | EntryPercentage2 | False |  |  | Edm.Double | Second entry percentage |
|  | EntryType | False |  |  | Edm.Int16 | Entry type |
|  | EntryTypeDescription | False |  |  | Edm.String | Entry type description |
|  | Frequency | False |  |  | Edm.Int32 | Frequency: 1 - Yearly, 2 - Quarterly, 3 - Monthly, 4 - 4-weekly, 5 - Weekly, 11 - Yearly (Pro forma), 12 - Quarterly (Pro forma), 13 - Monthly (Pro forma), 14 - 4-Weekly (Pro forma), 15 - Weekly (Pro forma) |
|  | FullName | False |  |  | Edm.String | Name of employee |
|  | ModifiedDate | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | Modifier |
|  | ModifierFullName | False |  |  | Edm.String | Modifier full name |
|  | PayrollComponent | False |  |  | Edm.Guid | Payroll component |
|  | PayrollComponentCode | False |  |  | Edm.String | Payroll component code |
|  | PayrollComponentDescription | False |  |  | Edm.String | Payroll component description |
|  | PayrollComponentType | False |  |  | Edm.Int32 | Payroll component type |
|  | PayrollComponentTypeDescription | False |  |  | Edm.String | Payroll component type description |
|  | PayrollRun | False |  |  | Edm.Guid | Payroll run |
|  | PayrollRunCode | False |  |  | Edm.String | Payroll run code |
|  | PayrollYear | False |  |  | Edm.Int16 | Payroll year |
|  | Period | False |  |  | Edm.Int16 | Period |
|  | Status | False |  |  | Edm.Int16 | Transaction status: 1 - Not entered, 2 - Entered, 3 - Open, 4 - Calculated, 5 - Approved, 6 - Finalized, 7 - Deleted |
|  | Type | False |  |  | Edm.Int16 | Transaction type |
|  | TypeDescription | False |  |  | Edm.String | Transaction type description |

## Returns

---

## PayrollTransactionsByPayrollYear - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - PayrollTransactionsByPayrollYear

## Endpoint

PayrollTransactionsByPayrollYear

## Good to know

This bulk service has a page size of 1000.

 Only the following filters are supported for this endpoint:
 Employment, Frequency, PayrollComponent, PayrollYear, Period, Status

## Beta

This endpoint is no longer in beta, but due to the impact on current customers the URL will keep the beta part in it for now.

## Scope

Hrm payroll

## Function URI

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

GET 
## Example usage

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

/api/v1/beta/{division}/payroll/PayrollTransactionsByPayrollYear

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Transaction |
|  | CalculatedAmount | False |  |  | Edm.Double | Calculated amount |
|  | CalculatedBaseValue | False |  |  | Edm.Double | Calculated base value |
|  | CalculatedFranchise | False |  |  | Edm.Double | Calculated franchise |
|  | CalculatedMaximum | False |  |  | Edm.Double | Calculated maximum |
|  | CalculatedNumber | False |  |  | Edm.Double | Calculated number |
|  | CostCenter | False |  |  | Edm.String | Cost center |
|  | CostCenterCode | False |  |  | Edm.String | Cost center code |
|  | CostCenterDescription | False |  |  | Edm.String | Cost center description |
|  | CostUnit | False |  |  | Edm.String | Cost unit |
|  | CostUnitCode | False |  |  | Edm.String | Cost unit code |
|  | CostUnitDescription | False |  |  | Edm.String | Cost unit description |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | Creator |
|  | CreatorFullName | False |  |  | Edm.String | Creator full name |
|  | Date | False |  |  | Edm.DateTime | Date |
|  | Department | False |  |  | Edm.Guid | Department |
|  | DepartmentCode | False |  |  | Edm.String | Department code |
|  | DepartmentDescription | False |  |  | Edm.String | Department description |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | Employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number |
|  | Employment | False |  |  | Edm.Guid | Employment |
|  | EmploymentConditionGroup | False |  |  | Edm.Guid | Employment condition group |
|  | EmploymentConditionGroupCode | False |  |  | Edm.String | Employment condition group code |
|  | EmploymentConditionGroupDescription | False |  |  | Edm.String | Employment condition group description |
|  | EntryAmount | False |  |  | Edm.Double | Entry amount |
|  | EntryBase | False |  |  | Edm.Double | Entry base |
|  | EntryNumber | False |  |  | Edm.Double | Entry number |
|  | EntryPercentage | False |  |  | Edm.Double | Entry percentage |
|  | EntryPercentage2 | False |  |  | Edm.Double | Second entry percentage |
|  | EntryType | False |  |  | Edm.Int16 | Entry type |
|  | EntryTypeDescription | False |  |  | Edm.String | Entry type description |
|  | Frequency | False |  |  | Edm.Int32 | Frequency: 1 - Yearly, 2 - Quarterly, 3 - Monthly, 4 - 4-weekly, 5 - Weekly, 11 - Yearly (Pro forma), 12 - Quarterly (Pro forma), 13 - Monthly (Pro forma), 14 - 4-Weekly (Pro forma), 15 - Weekly (Pro forma) |
|  | FullName | False |  |  | Edm.String | Name of employee |
|  | ModifiedDate | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | Modifier |
|  | ModifierFullName | False |  |  | Edm.String | Modifier full name |
|  | PayrollComponent | False |  |  | Edm.Guid | Payroll component |
|  | PayrollComponentCode | False |  |  | Edm.String | Payroll component code |
|  | PayrollComponentDescription | False |  |  | Edm.String | Payroll component description |
|  | PayrollComponentType | False |  |  | Edm.Int32 | Payroll component type |
|  | PayrollComponentTypeDescription | False |  |  | Edm.String | Payroll component type description |
|  | PayrollRun | False |  |  | Edm.Guid | Payroll run |
|  | PayrollRunCode | False |  |  | Edm.String | Payroll run code |
|  | PayrollYear | False |  |  | Edm.Int16 | Payroll year |
|  | Period | False |  |  | Edm.Int16 | Period |
|  | Status | False |  |  | Edm.Int16 | Transaction status: 1 - Not entered, 2 - Entered, 3 - Open, 4 - Calculated, 5 - Approved, 6 - Finalized, 7 - Deleted |
|  | Type | False |  |  | Edm.Int16 | Transaction type |
|  | TypeDescription | False |  |  | Edm.String | Transaction type description |

## Returns

---

## TaxEmploymentEndFlexCodes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TaxEmploymentEndFlexCodes

## Endpoint

TaxEmploymentEndFlexCodes

## Good to know

Use this endpoint to read employment end flex codes.

An employment end flex code is used for flexworkers to indicate the reason that the employment is ended.
 With the tax authority this phase is known as 'Code reden einde inkomstenverhouding flexwerker'.

 The reason is set in the employment, that can be read using the Employments endpoint.

This endpoint is available for the following packages:

- Payroll
- Professional Services (Plus, Professional & Premium only)

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes

GET 
## Example usage

/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes

/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes

/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes

/api/v1/{division}/payroll/TaxEmploymentEndFlexCodes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | Code of flexible employment end reason |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | False |  |  | Edm.String | Description of flexible employment end reason |
|  | EndDate | False |  |  | Edm.DateTime | Date until which the flexible employment end reason is allowed |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | StartDate | False |  |  | Edm.DateTime | Date as of which the flexible employment end reason is allowed |

## Returns

---

## VariableMutations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - VariableMutations

## Endpoint

VariableMutations

## Good to know

Use this endpoint to :
 • Create a new variable mutation entry. It is mandatory to provide the value for PayrollYear, PayrollPeriod, EmployeeHID, and Type.If the Type is payroll component, then PayrollComponent property is also mandatory.
 • Get the details of variable mutation entry. Filters can be used to reduce the amount of data retrieved.
 • Update a variable mutation entry. It is mandatory to provide the ID of the entry to update.

Note: To access the API using OAuth 2.0 authentication process, see Using OAuth 2.0 to access Exact Online API. 
You can find examples for setting up each API request in Make the request - REST
 

For more information about the functionality in Exact Online, see Payroll through variable mutations.

This endpoint is available for the following packages:

- Payroll

## Scope

Hrm payroll

## URI

/api/v1/{division}/payroll/VariableMutations

GET  POST  PUT 
## Example usage

/api/v1/{division}/payroll/VariableMutations

/api/v1/{division}/payroll/VariableMutations

/api/v1/{division}/payroll/VariableMutations

/api/v1/{division}/payroll/VariableMutations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Description | False |  |  | Edm.String | Description for the payroll component entry |
|  | EmployeeHID | True |  |  | Edm.Int32 | Numeric number of Employee |
|  | EmployeeID | False |  |  | Edm.Guid | Employee ID |
|  | EntryFieldType | False |  |  | Edm.Int32 | Entry field types: 1 = Quantity, 2 = Amount, 3 = Percentage |
|  | Notes | False |  |  | Edm.String | Notes for the payroll component entry |
|  | PayrollComponent | False |  |  | Edm.String | Payroll component code |
|  | PayrollComponentID | False |  |  | Edm.Guid | Payroll component ID |
|  | PayrollPeriod | True |  |  | Edm.Int16 | Payroll period |
|  | PayrollYear | True |  |  | Edm.Int16 | Payroll year |
|  | Type | True |  |  | Edm.Int32 | Type of the entry:1 = Days worked, 2 = Hours worked, 3 = Days ill, 4 = Hours ill, 5 = Days leave, 6 = Hours leave, 7 = Payroll component, 8 = Days care leave, 9 = Hours care leave, 10 = Days extended partner leave, 11 = Hours extended partner leave, 12 = Days Unpaid Leave, 13 = Hours Unpaid Leave, 14 = Days Paid Parental Leave, 15 = Hours Paid Parental Leave16 = Average days worked, 17 = Average hours worked, 18 = Days unpaid parental leave, 19 = Hours unpaid parental leave, 20 = Days maternity leave, 21 = Hours maternity leave |
|  | Value | True |  |  | Edm.Double | Value of the entry |

## Returns

---

## CostEntryExpensesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryExpensesByProject

## Endpoint

CostEntryExpensesByProject

## Good to know

This endpoint enables users to retrieve a list of Expenses and its parent Deliverable based on the project ID provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryExpensesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of activity or expense |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description of activity or expense |
|  | ParentDescription | False |  |  | Edm.String | Description of its parent |

## Returns

---

## CostEntryExpensesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryExpensesByProject

## Endpoint

CostEntryExpensesByProject

## Good to know

This endpoint enables users to retrieve a list of Expenses and its parent Deliverable based on the project ID provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryExpensesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

/api/v1/{division}/read/project/CostEntryExpensesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of activity or expense |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description of activity or expense |
|  | ParentDescription | False |  |  | Edm.String | Description of its parent |

## Returns

---

## CostEntryRecentAccounts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentAccounts

## Endpoint

CostEntryRecentAccounts

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for cost entries. The list Is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentAccounts

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## CostEntryRecentAccounts - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentAccounts

## Endpoint

CostEntryRecentAccounts

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for cost entries. The list Is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentAccounts

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

/api/v1/{division}/read/project/CostEntryRecentAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## CostEntryRecentAccountsByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentAccountsByProject

## Endpoint

CostEntryRecentAccountsByProject

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for cost entries based on the Project Id provided. The list Is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## CostEntryRecentAccountsByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentAccountsByProject

## Endpoint

CostEntryRecentAccountsByProject

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for cost entries based on the Project Id provided. The list Is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

/api/v1/{division}/read/project/CostEntryRecentAccountsByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## CostEntryRecentCostTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentCostTypes

## Endpoint

CostEntryRecentCostTypes

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for cost entries. The list is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentCostTypes

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## CostEntryRecentCostTypes - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentCostTypes

## Endpoint

CostEntryRecentCostTypes

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for cost entries. The list is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentCostTypes

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

/api/v1/{division}/read/project/CostEntryRecentCostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## CostEntryRecentCostTypesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentCostTypesByProject

## Endpoint

CostEntryRecentCostTypesByProject

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for cost entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## CostEntryRecentCostTypesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentCostTypesByProject

## Endpoint

CostEntryRecentCostTypesByProject

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for cost entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

/api/v1/{division}/read/project/CostEntryRecentCostTypesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## CostEntryRecentExpensesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentExpensesByProject

## Endpoint

CostEntryRecentExpensesByProject

## Good to know

This endpoint enables users to retrieve a list of Expenses and its parent Deliverable used by an employee for cost entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | DateLastUsed | False |  |  | Edm.DateTime | Date last used |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description |
|  | ParentDescription | False |  |  | Edm.String | Description of Parent |

## Returns

---

## CostEntryRecentExpensesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentExpensesByProject

## Endpoint

CostEntryRecentExpensesByProject

## Good to know

This endpoint enables users to retrieve a list of Expenses and its parent Deliverable used by an employee for cost entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

/api/v1/{division}/read/project/CostEntryRecentExpensesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | DateLastUsed | False |  |  | Edm.DateTime | Date last used |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description |
|  | ParentDescription | False |  |  | Edm.String | Description of Parent |

## Returns

---

## CostEntryRecentProjects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentProjects

## Endpoint

CostEntryRecentProjects

## Good to know

This endpoint enables users to retrieve a list of Projects used by an employee for cost entries. The list is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## CostEntryRecentProjects - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostEntryRecentProjects

## Endpoint

CostEntryRecentProjects

## Good to know

This endpoint enables users to retrieve a list of Projects used by an employee for cost entries. The list is ordered by the most recently used first.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostEntryRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

/api/v1/{division}/read/project/CostEntryRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## CostsByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostsByDate

## Endpoint

CostsByDate

## Good to know

Use this endpoint to read , filter and display all cost entries by employee based on the Date provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostsByDate

GET 
## Example usage

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## CostsByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostsByDate

## Endpoint

CostsByDate

## Good to know

Use this endpoint to read , filter and display all cost entries by employee based on the Date provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostsByDate

GET 
## Example usage

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

/api/v1/{division}/read/project/CostsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## CostsById

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostsById

## Endpoint

CostsById

## Good to know

This endpoint enables users to retrieve a cost entry's information for an employee.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostsById

GET 
## Example usage

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## CostsById - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostsById

## Endpoint

CostsById

## Good to know

This endpoint enables users to retrieve a cost entry's information for an employee.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostsById

GET 
## Example usage

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

/api/v1/{division}/read/project/CostsById

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## CostTransactions

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTransactions

## Endpoint

CostTransactions

## Good to know

Use this endpoint to create, read, update and delete cost transaction of the user.

Note: For creating a cost transaction, it is mandatory to supply one of the following properties
 • Account
 • Project
 • Subscription
 And always supply
 • Item
 • Quantity

This entity supports webhooks.
Subscribe to CostTransactions topic to get updates on the Cost resource. Note that you will also receive events on the CostTransactions resource.

## Scope

Projects projects

## URI

/api/v1/{division}/project/CostTransactions

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/CostTransactions

/api/v1/{division}/project/CostTransactions

/api/v1/{division}/project/CostTransactions

/api/v1/{division}/project/CostTransactions

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Webhook ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid |  | Primary key |
|  | Account | False |  |  | Edm.Guid |  | Reference to the account |
|  | AccountName | False |  |  | Edm.String |  | Name of account that is linked to the project |
|  | Amount | False |  |  | Edm.Double |  | This property is obsolete. Use property 'AmountFC' instead. |
|  | AmountFC | False |  |  | Edm.Double |  | Calculated amount of the transaction based on (Quantity * PriceFC) |
|  | Attachment | False |  |  | Edm.Guid |  | Attachment linked to the transaction (not mandatory) |
|  | Created | False |  |  | Edm.DateTime |  | Date and time the transaction was created |
|  | Creator | False |  |  | Edm.Guid |  | The Guid ID of user that created the transaction |
|  | CreatorFullName | False |  |  | Edm.String |  | The full name of the user |
|  | Currency | False |  |  | Edm.String |  | Currency of amount FC |
|  | CustomField | False |  |  | Edm.String |  | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Date | False |  |  | Edm.DateTime |  | Date and time the cost transaction was done |
|  | Division | False |  |  | Edm.Int32 |  | Division code |
|  | DivisionDescription | False |  |  | Edm.String |  | Description of Division |
|  | Employee | False |  |  | Edm.Guid |  | Guid ID of the employee that is linked to the cost transaction |
|  | EntryNumber | False |  |  | Edm.Int32 |  | Number that represents the grouping of cost transactions |
|  | ErrorText | False |  |  | Edm.String |  | (Only used by backgroundjobs) To determine which transaction has an error |
|  | Expense | False |  |  | Edm.Guid |  | ProjectWBS (work breakdown structure) type 3 |
|  | ExpenseDescription | False |  |  | Edm.String |  | Description of ProjectWBS Expense |
|  | HourStatus | False |  |  | Edm.Int16 |  | Status of the transaction: 1 = Draft, 2 = Rejected, 10 = Submitted, 11 = Failed on approval, 14 = Processing, 16 = Processing, 19 = Failed while undoing approval, 20 = Final |
|  | Item | True |  |  | Edm.Guid |  | Item that is linked to the transaction, which provides the cost information |
|  | ItemDescription | False |  |  | Edm.String |  | Description of the item that is linked to the transaction |
|  | ItemDivisable | False |  |  | Edm.Boolean |  | Indicates if fractional quantities of the item can be used, for example quantity = 0.4 |
|  | Modified | False |  |  | Edm.DateTime |  | The date and time transaction record was modified |
|  | Modifier | False |  |  | Edm.Guid |  | The ID of the user that modified the records |
|  | ModifierFullName | False |  |  | Edm.String |  | The full name of the user that modified the record |
|  | Notes | False |  |  | Edm.String |  | Notes linked to the transaction for providing additional information (not mandatory) |
|  | Price | False |  |  | Edm.Double |  | This property is obsolete. Use property 'PriceFC' instead. |
|  | PriceFC | False |  |  | Edm.Double |  | For use in AmountFC (Quantiy * Price FC) |
|  | Project | False |  |  | Edm.Guid |  | Project that is linked to the transaction |
|  | ProjectAccount | False |  |  | Edm.Guid |  | Project account ID that is linked to the transaction (not mandatory) |
|  | ProjectAccountCode | False |  |  | Edm.String |  | Project account code that is linked to the transaction |
|  | ProjectAccountName | False |  |  | Edm.String |  | Project account name that is linked to the transaction |
|  | ProjectDescription | False |  |  | Edm.String |  | Project description that is linked to the transaction |
|  | Quantity | True |  |  | Edm.Double |  | Quantity of the item that is linked to the transaction |
|  | SkipValidation | False |  |  | Edm.Boolean |  | Skip validation |
|  | Subscription | False |  |  | Edm.Guid |  | Subscription that is linked to the transaction |
|  | SubscriptionAccount | False |  |  | Edm.Guid |  | Subscription account that is linked to the transaction, this is to identify the referenced subscription |
|  | SubscriptionAccountCode | False |  |  | Edm.String |  | Subscription account code that is linked to the transaction |
|  | SubscriptionAccountName | False |  |  | Edm.String |  | Subscription account name that is linked to the transaction |
|  | SubscriptionDescription | False |  |  | Edm.String |  | Subscription description that is linked to the transaction |
|  | SubscriptionNumber | False |  |  | Edm.Int32 |  | Subscription number that is linked to the transaction |
|  | Type | False |  |  | Edm.Int16 |  | The type of transaction. E.g: Time = 1, Cost = 2 |

## Returns

---

## CostTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypes

## Endpoint

CostTypes

## Good to know

This endpoint enables users to retrieve up to date active Cost types.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostTypes

GET 
## Example usage

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## CostTypes - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypes

## Endpoint

CostTypes

## Good to know

This endpoint enables users to retrieve up to date active Cost types.

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/CostTypes

GET 
## Example usage

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

/api/v1/{division}/read/project/CostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## CostTypesByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypesByDate

## Endpoint

CostTypesByDate

## Good to know

This endpoint enables users to retrieve active Cost types based on date provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostTypesByDate

GET 
## Example usage

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## CostTypesByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypesByDate

## Endpoint

CostTypesByDate

## Good to know

This endpoint enables users to retrieve active Cost types based on date provided.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostTypesByDate

GET 
## Example usage

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

/api/v1/{division}/read/project/CostTypesByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## CostTypesByProjectAndDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypesByProjectAndDate

## Endpoint

CostTypesByProjectAndDate

## Good to know

This endpoint enables users to retrieve active Cost types based on Project and date provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostTypesByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## CostTypesByProjectAndDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - CostTypesByProjectAndDate

## Endpoint

CostTypesByProjectAndDate

## Good to know

This endpoint enables users to retrieve active Cost types based on Project and date provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/CostTypesByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

/api/v1/{division}/read/project/CostTypesByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## EmployeeRestrictionItems

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmployeeRestrictionItems

## Endpoint

EmployeeRestrictionItems

## Good to know

Use this endpoint to create, read, update and delete employee restriction items, it restricts hour types that can be used in time entries for the employee..

Note: For creating an employee restriction item, it is mandatory to supply employee and item. The supplied item needs to be a time unit item.

## Scope

Projects projects

## URI

/api/v1/{division}/project/EmployeeRestrictionItems

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/EmployeeRestrictionItems

/api/v1/{division}/project/EmployeeRestrictionItems

/api/v1/{division}/project/EmployeeRestrictionItems

/api/v1/{division}/project/EmployeeRestrictionItems

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Date and time when the employee restriction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the employee restriction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the employee restriction |
|  | Division | False |  |  | Edm.Int32 | Division of employee restriction |
|  | Employee | True |  |  | Edm.Guid | ID of the employee that linked to the employee restriction |
|  | EmployeeFullName | False |  |  | Edm.String | Full name in string of the employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee HID of the employee |
|  | Item | True |  |  | Edm.Guid | ID of item that linked to the employee restriction |
|  | ItemCode | False |  |  | Edm.String | Code of item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |
|  | ItemIsTime | False |  |  | Edm.Byte | Indicates if the item is a time unit item |
|  | Modified | False |  |  | Edm.DateTime | Last date when the employee restriction was modified |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the employee restriction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the employee restriction |

## Returns

---

## EmploymentInternalRates

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - EmploymentInternalRates

## Endpoint

EmploymentInternalRates

## Good to know

Use this endpoint to retrieve internal rates of employees.

## Scope

Projects billing

## URI

/api/v1/{division}/project/EmploymentInternalRates

GET 
## Example usage

/api/v1/{division}/project/EmploymentInternalRates

/api/v1/{division}/project/EmploymentInternalRates

/api/v1/{division}/project/EmploymentInternalRates

/api/v1/{division}/project/EmploymentInternalRates

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of internal rate |
|  | Created | False |  |  | Edm.DateTime | Date and time when the internal rates was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the internal rate |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the record |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | False |  |  | Edm.Guid | ID of employee that linked to the internal rate |
|  | EmployeeFullName | False |  |  | Edm.String | Name of employee that linked to the internal rate |
|  | EmployeeHID | False |  |  | Edm.Int32 | Employee number that linked to the internal rate |
|  | Employment | False |  |  | Edm.Guid | ID of employment that linked to the internal rate |
|  | EmploymentHID | False |  |  | Edm.Int32 | Employement number that linked to the internal rate |
|  | EndDate | False |  |  | Edm.DateTime | End date of internal rate |
|  | IntercompanyRate | False |  |  | Edm.Double | Amount of intercompany rate |
|  | InternalRate | False |  |  | Edm.Double | Amount of internal rate |
|  | Modified | False |  |  | Edm.DateTime | Last modified date of internal rate |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the internal rate |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the internal rate |
|  | StartDate | False |  |  | Edm.DateTime | Start date of internal rate |

## Returns

---

## HourCostTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourCostTypes

## Endpoint

HourCostTypes

## Good to know

This endpoint enables users to retrieve up to date active Hour and Cost types.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourCostTypes

GET 
## Example usage

/api/v1/{division}/read/project/HourCostTypes

/api/v1/{division}/read/project/HourCostTypes

/api/v1/{division}/read/project/HourCostTypes

/api/v1/{division}/read/project/HourCostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourEntryActivitiesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryActivitiesByProject

## Endpoint

HourEntryActivitiesByProject

## Good to know

This endpoint enables users to retrieve a list of WBS Activities and its parent Deliverable based on the project ID provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryActivitiesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of activity or expense |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description of activity or expense |
|  | ParentDescription | False |  |  | Edm.String | Description of its parent |

## Returns

---

## HourEntryActivitiesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryActivitiesByProject

## Endpoint

HourEntryActivitiesByProject

## Good to know

This endpoint enables users to retrieve a list of WBS Activities and its parent Deliverable based on the project ID provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryActivitiesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

/api/v1/{division}/read/project/HourEntryActivitiesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of activity or expense |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description of activity or expense |
|  | ParentDescription | False |  |  | Edm.String | Description of its parent |

## Returns

---

## HourEntryRecentAccounts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentAccounts

## Endpoint

HourEntryRecentAccounts

## Good to know

Use this endpoint to read a list of accounts that is used by an employee to create hour entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentAccounts

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## HourEntryRecentAccounts - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentAccounts

## Endpoint

HourEntryRecentAccounts

## Good to know

Use this endpoint to read a list of accounts that is used by an employee to create hour entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentAccounts

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

/api/v1/{division}/read/project/HourEntryRecentAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## HourEntryRecentAccountsByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentAccountsByProject

## Endpoint

HourEntryRecentAccountsByProject

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## HourEntryRecentAccountsByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentAccountsByProject

## Endpoint

HourEntryRecentAccountsByProject

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

/api/v1/{division}/read/project/HourEntryRecentAccountsByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## HourEntryRecentActivitiesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentActivitiesByProject

## Endpoint

HourEntryRecentActivitiesByProject

## Good to know

This endpoint enables users to retrieve a list of Activities and its parent Deliverable used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | DateLastUsed | False |  |  | Edm.DateTime | Date last used |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description |
|  | ParentDescription | False |  |  | Edm.String | Description of Parent |

## Returns

---

## HourEntryRecentActivitiesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentActivitiesByProject

## Endpoint

HourEntryRecentActivitiesByProject

## Good to know

This endpoint enables users to retrieve a list of Activities and its parent Deliverable used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

/api/v1/{division}/read/project/HourEntryRecentActivitiesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | DateLastUsed | False |  |  | Edm.DateTime | Date last used |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description |
|  | ParentDescription | False |  |  | Edm.String | Description of Parent |

## Returns

---

## HourEntryRecentHourTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentHourTypes

## Endpoint

HourEntryRecentHourTypes

## Good to know

Use this endpoint to read a list of items that is used by an employee to create hour entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentHourTypes

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## HourEntryRecentHourTypes - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentHourTypes

## Endpoint

HourEntryRecentHourTypes

## Good to know

Use this endpoint to read a list of items that is used by an employee to create hour entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentHourTypes

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

/api/v1/{division}/read/project/HourEntryRecentHourTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## HourEntryRecentHourTypesByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentHourTypesByProject

## Endpoint

HourEntryRecentHourTypesByProject

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## HourEntryRecentHourTypesByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentHourTypesByProject

## Endpoint

HourEntryRecentHourTypesByProject

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for hour entries based on the Project Id provided. The list is ordered by the most recently used first.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

/api/v1/{division}/read/project/HourEntryRecentHourTypesByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## HourEntryRecentProjects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentProjects

## Endpoint

HourEntryRecentProjects

## Good to know

Use this endpoint to read and retrieve projects that employees have used for entering hour entries order by most recently.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## HourEntryRecentProjects - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourEntryRecentProjects

## Endpoint

HourEntryRecentProjects

## Good to know

Use this endpoint to read and retrieve projects that employees have used for entering hour entries order by most recently.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourEntryRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

/api/v1/{division}/read/project/HourEntryRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## HoursByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HoursByDate

## Endpoint

HoursByDate

## Good to know

Use this endpoint to read , filter and display all hour entries by employee based on the Date provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HoursByDate

GET 
## Example usage

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## HoursByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HoursByDate

## Endpoint

HoursByDate

## Good to know

Use this endpoint to read , filter and display all hour entries by employee based on the Date provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HoursByDate

GET 
## Example usage

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

/api/v1/{division}/read/project/HoursByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## HoursById

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HoursById

## Endpoint

HoursById

## Good to know

This endpoint enables users to retrieve an hour entry's information for an employee.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HoursById

GET 
## Example usage

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## HoursById - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HoursById

## Endpoint

HoursById

## Good to know

This endpoint enables users to retrieve an hour entry's information for an employee.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HoursById

GET 
## Example usage

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

/api/v1/{division}/read/project/HoursById

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## HourTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypes

## Endpoint

HourTypes

## Good to know

This endpoint enables users to retrieve up to date active Hour types.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourTypes

GET 
## Example usage

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourTypes - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypes

## Endpoint

HourTypes

## Good to know

This endpoint enables users to retrieve up to date active Hour types.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/HourTypes

GET 
## Example usage

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

/api/v1/{division}/read/project/HourTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourTypesByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypesByDate

## Endpoint

HourTypesByDate

## Good to know

This endpoint enables users to retrieve active Hour types based on date provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourTypesByDate

GET 
## Example usage

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourTypesByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypesByDate

## Endpoint

HourTypesByDate

## Good to know

This endpoint enables users to retrieve active Hour types based on date provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourTypesByDate

GET 
## Example usage

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

/api/v1/{division}/read/project/HourTypesByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourTypesByProjectAndDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypesByProjectAndDate

## Endpoint

HourTypesByProjectAndDate

## Good to know

Use this endpoint to read active hour types by providing project id and a reference check date.

Note: Employee Id parameter is optional. Hour types listed will be based on a hierachy with project employee hour type restriction, project hour type restriction and employee restriction by providing this additional parameter. 
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourTypesByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## HourTypesByProjectAndDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - HourTypesByProjectAndDate

## Endpoint

HourTypesByProjectAndDate

## Good to know

Use this endpoint to read active hour types by providing project id and a reference check date.

Note: Employee Id parameter is optional. Hour types listed will be based on a hierachy with project employee hour type restriction, project hour type restriction and employee restriction by providing this additional parameter. 
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/HourTypesByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

/api/v1/{division}/read/project/HourTypesByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | GUID id of the item that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is linked to the project |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is linked to the project |

## Returns

---

## InvoiceTerms

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - InvoiceTerms

## Endpoint

InvoiceTerms

## Good to know

Use this endpoint to create, read, update and delete invoice terms for Fixed price/Prepaid project.
Invoice terms are agreed-upon amounts that must be paid by certain dates. Invoice terms can be created for Fixed price and Prepaid projects.

Note: For creating invoice term, it is mandatory to supply Project Id and Amount.

## Scope

Projects projects

## URI

/api/v1/{division}/project/InvoiceTerms

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/InvoiceTerms

/api/v1/{division}/project/InvoiceTerms

/api/v1/{division}/project/InvoiceTerms

/api/v1/{division}/project/InvoiceTerms

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Amount | True |  |  | Edm.Double | Amount in the currency of the transaction |
|  | Created | False |  |  | Edm.DateTime | Date and time when the invoice term was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the invoice term |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the record |
|  | Deliverable | False |  |  | Edm.String | WBS's deliverable linked to the invoice term |
|  | Description | False |  |  | Edm.String | Description of invoice term |
|  | Division | False |  |  | Edm.Int32 | Division number |
|  | ExecutionFromDate | False |  |  | Edm.DateTime | Execution date: From of invoice term |
|  | ExecutionToDate | False |  |  | Edm.DateTime | Execution date: To of invoice term |
|  | InvoiceDate | False |  |  | Edm.DateTime | Invoice date of invoice term |
|  | InvoiceId | False |  |  | Edm.Guid | ID of sales invoice |
|  | InvoiceStatus | False |  |  | Edm.Int16 | The invoice status of the invoice term. E.g: 10 = Draft, 20 = Open, 30 = Processing..., 50 = Processed |
|  | Item | False |  |  | Edm.Guid | Item that linked to the invoice term |
|  | ItemDescription | False |  |  | Edm.String | Description of item that linked to the invoice term |
|  | Modified | False |  |  | Edm.DateTime | Last modified date of invoice term |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the record |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the record |
|  | Notes | False |  |  | Edm.String | Notes linked to the invoice term for providing additional information |
|  | Percentage | False |  |  | Edm.Double | Percentage of amount per project's budgeted amount |
|  | Project | True |  |  | Edm.Guid | ID of project that linked to the invoice term |
|  | ProjectDescription | False |  |  | Edm.String | Project description that linked to the invoice term |
|  | VATCode | False |  |  | Edm.String | VAT code that used in the invoice term |
|  | VATCodeDescription | False |  |  | Edm.String | Description of VAT code that used in the invoice term |
|  | VATPercentage | False |  |  | Edm.Double | Percentage of VAT code that used in the invoice term |
|  | WBS | False |  |  | Edm.Guid | ID of WBS that linked to the invoice term |

## Returns

---

## ProjectAccountMutations

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectAccountMutations

## Endpoint

ProjectAccountMutations

## Good to know

Use this endpoint to create, read, update and delete project account mutations.

Note: This endpoint only allow user to create last record and user is not allow to create record in between lines. For POST it is mandatory to provide Account, Project and StartDate.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectAccountMutations

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectAccountMutations

/api/v1/{division}/project/ProjectAccountMutations

/api/v1/{division}/project/ProjectAccountMutations

/api/v1/{division}/project/ProjectAccountMutations

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | True |  |  | Edm.Guid | The account that is involved in project account mutation |
|  | AccountCode | False |  |  | Edm.String | Account code that is involved in project account mutation |
|  | AccountName | False |  |  | Edm.String | Name of Account that is involved in project account mutation |
|  | Created | False |  |  | Edm.DateTime | The date and time when the project account mutation was created |
|  | Creator | False |  |  | Edm.Guid | The guid ID of the user that created the project account mutation |
|  | CreatorFullName | False |  |  | Edm.String | The full name of the user that created the project account mutation |
|  | Division | False |  |  | Edm.Int32 | The division of the project and account mutation |
|  | DivisionName | False |  |  | Edm.String | Name of Division |
|  | EndDate | False |  |  | Edm.DateTime | End date of the project account mutation |
|  | Modified | False |  |  | Edm.DateTime | The date when the project account mutation was modified |
|  | Modifier | False |  |  | Edm.Guid | The guid ID of the user that modified the project account mutation |
|  | ModifierFullName | False |  |  | Edm.String | The full name of the user that modified the project account mutation |
|  | Notes | False |  |  | Edm.String | For additional information about project account mutations |
|  | Project | True |  |  | Edm.Guid | The project that is involved in project account mutation |
|  | ProjectCode | False |  |  | Edm.String | Project code that is involved in project account mutation |
|  | ProjectDescription | False |  |  | Edm.String | Project description that is involved in project account mutation |
|  | StartDate | True |  |  | Edm.DateTime | Start date of a project account mutation |

## Returns

---

## ProjectBudgetTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectBudgetTypes

## Endpoint

ProjectBudgetTypes

## Good to know

This endpoint enables users to retrieve a list of project budget types.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectBudgetTypes

GET 
## Example usage

/api/v1/{division}/project/ProjectBudgetTypes

/api/v1/{division}/project/ProjectBudgetTypes

/api/v1/{division}/project/ProjectBudgetTypes

/api/v1/{division}/project/ProjectBudgetTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Int16 | Primary key |
|  | Description | False |  |  | Edm.String | Description |

## Returns

---

## ProjectClassifications

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectClassifications

## Endpoint

ProjectClassifications

## Good to know

Use this endpoint to create, read, update and delete project classifications.

Note: For creating a project classifications, it is mandatory to supply Code and Description.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectClassifications

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectClassifications

/api/v1/{division}/project/ProjectClassifications

/api/v1/{division}/project/ProjectClassifications

/api/v1/{division}/project/ProjectClassifications

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | True |  |  | Edm.String | Code |
|  | CostCenter | False |  |  | Edm.String | Cost Center linked to the project classification |
|  | CostCenterDescription | False |  |  | Edm.String | Description of Costcenter |
|  | CostUnit | False |  |  | Edm.String | Cost unit linked to the project classification |
|  | CostUnitDescription | False |  |  | Edm.String | Description of Costunit |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | Description | True |  |  | Edm.String | Description of the project classification |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | DivisionName | False |  |  | Edm.String | Name of Division |
|  | Modified | False |  |  | Edm.DateTime | Last modified date |
|  | Modifier | False |  |  | Edm.Guid | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String | Name of modifier |
|  | UseEmployeeCostCenter | False |  |  | Edm.Boolean | Indicates whether to use employee cost center and cost unit |

## Returns

---

## ProjectHourBudgets

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectHourBudgets

## Endpoint

ProjectHourBudgets

## Good to know

This endpoint enables users to maintain budgeted hours per hour type of a project.
Hours per hour type means you can budget the expected number of hours to finish the project and you create this for each hour type you need.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectHourBudgets

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectHourBudgets

/api/v1/{division}/project/ProjectHourBudgets

/api/v1/{division}/project/ProjectHourBudgets

/api/v1/{division}/project/ProjectHourBudgets

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Budget | True |  |  | Edm.Double | Number of hours to be budgeted to a project |
|  | Created | False |  |  | Edm.DateTime | Date and time when the project hour budget was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the project hour budget |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the project hour budget |
|  | Division | False |  |  | Edm.Int32 | Division number |
|  | Item | True |  |  | Edm.Guid | ID of hour type of budget |
|  | ItemCode | False |  |  | Edm.String | Code of hour type |
|  | ItemDescription | False |  |  | Edm.String | Description of hour type |
|  | Modified | False |  |  | Edm.DateTime | Last modified date of project hour budget |
|  | Modifier | False |  |  | Edm.Guid | ID of last user that modified the project hour budget |
|  | ModifierFullName | False |  |  | Edm.String | Full name of last user that modified the project hour budget |
|  | Project | True |  |  | Edm.Guid | Project ID that the budgeted hours is referenced to |
|  | ProjectCode | False |  |  | Edm.String | Project code that the budgeted hours is referenced to |
|  | ProjectDescription | False |  |  | Edm.String | Project description that the budgeted hours is referenced to |

## Returns

---

## ProjectPlanning

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectPlanning

## Endpoint

ProjectPlanning

## Good to know

Use this endpoint to create, read, update and delete project planning for employees in the division.

Note: The user can block out the capacity for employees or set it to reserve status first if it is not yet confirmed. Helps the user get an overview on how the employee will spend time. For POST it is mandatory to provide Description, Employee, EndDate, HourType, StartDate, Status.

This entity supports webhooks.
Subscribe to ProjectPlanning topic to get updates on the ProjectPlanning resource. Note that you will also receive events on the ProjectPlanning resource.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectPlanning

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectPlanning

/api/v1/{division}/project/ProjectPlanning

/api/v1/{division}/project/ProjectPlanning

/api/v1/{division}/project/ProjectPlanning

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Webhook ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid |  | Primary key |
|  | Account | False |  |  | Edm.Guid |  | Account linked to the project planning |
|  | AccountCode | False |  |  | Edm.String |  | Account code linked to project planning |
|  | AccountName | False |  |  | Edm.String |  | Account name linked to project planning |
|  | BGTStatus | False |  |  | Edm.Int16 |  | Status of the background task for project planning, 1 = To be processed, 2 = Processed, 3 = Failed |
|  | CommunicationErrorStatus | False |  |  | Edm.Int16 |  | Status of the external calender linked to project planning, 0 = No error, 1 = Credentials error, 2 = Technical error, 3 = Both credentials & technical errors, 4 = In progress |
|  | Created | False |  |  | Edm.DateTime |  | Date and time the record was created |
|  | Creator | False |  |  | Edm.Guid |  | The GUID ID of the user that created the project planning |
|  | CreatorFullName | False |  |  | Edm.String |  | The full name of the user that created the project planning |
|  | CustomField | False |  |  | Edm.String |  | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Description | True |  |  | Edm.String |  | The description of the project planning |
|  | Division | False |  |  | Edm.Int32 |  | The code of the company that the record is stored in |
|  | Employee | True |  |  | Edm.Guid |  | The GUID ID of the employee that is linked to the project planning |
|  | EmployeeCode | False |  |  | Edm.String |  | The code of the employee that is linked to the project planning |
|  | EmployeeHID | False |  |  | Edm.Int32 |  | The numeric ID of the employee that is linked to the project planning |
|  | EndDate | True |  |  | Edm.DateTime |  | The end date of the project planning, this is to indicate when the planning ends. E.g: End of a project |
|  | Hours | False |  |  | Edm.Double |  | Hours planned for the employee |
|  | HourType | True |  |  | Edm.Guid |  | The type of hours entered for the project planning, item with 'Time' type |
|  | HourTypeCode | False |  |  | Edm.String |  | The code of the item with 'Time' type that is used in project planning, can be used for searching for hour type |
|  | HourTypeDescription | False |  |  | Edm.String |  | The description of the item  with 'Time' type that is used in project planning |
|  | IsBrokenRecurrence | False |  |  | Edm.Boolean |  | Indicates whether the project planning is separated from the recurring planning |
|  | Modified | False |  |  | Edm.DateTime |  | Date the project planning record was modified |
|  | Modifier | False |  |  | Edm.Guid |  | The ID of the user that modified the project planning records |
|  | ModifierFullName | False |  |  | Edm.String |  | The full name of the user that modified the project planning record |
|  | Notes | False |  |  | Edm.String |  | Additional information on this project planning record |
|  | OverAllocate | False |  |  | Edm.Boolean |  | Indicates whether the entries can have over allocated planning hours |
|  | Project | False |  |  | Edm.Guid |  | Project ID that is linked to the planning |
|  | ProjectCode | False |  |  | Edm.String |  | Project code that is linked to the planning |
|  | ProjectDescription | False |  |  | Edm.String |  | Project description that is linked to the planning |
|  | ProjectPlanningRecurring | False |  |  | Edm.Guid |  | Recurring planning linked to project planning |
|  | ProjectWBS | False |  |  | Edm.Guid |  | Referenced project work break down structure ID that is linked to the project planning |
|  | ProjectWBSDescription | False |  |  | Edm.String |  | Referenced project work break down structure description that is linked to the project planning |
|  | StartDate | True |  |  | Edm.DateTime |  | Start date of the project planning |
|  | Status | True |  |  | Edm.Int16 |  | Status of the project planning, 1 = Reserved, 2 = Planned |
|  | Type | False |  |  | Edm.Int16 |  | Type of project planning, it will always be 4 for employee |

## Returns

---

## ProjectPlanningRecurring

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectPlanningRecurring

## Endpoint

ProjectPlanningRecurring

## Good to know

This endpoint enables users to maintain recurring planning for employees in the division. If it Is a recurring event, the user can just block it out at set intervals every day, week Or month, up to 500 instances.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectPlanningRecurring

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectPlanningRecurring

/api/v1/{division}/project/ProjectPlanningRecurring

/api/v1/{division}/project/ProjectPlanningRecurring

/api/v1/{division}/project/ProjectPlanningRecurring

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | False |  |  | Edm.Guid | Account linked to the recurring planning |
|  | AccountCode | False |  |  | Edm.String | Code of Account |
|  | AccountName | False |  |  | Edm.String | Name of Account |
|  | BGTStatus | False |  |  | Edm.Int16 | Status of the project planning process, 1 = To be processed, 2 = Processed, 3 = Failed |
|  | Created | False |  |  | Edm.DateTime | Creation date |
|  | Creator | False |  |  | Edm.Guid | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String | Name of creator |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DayOrThe | False |  |  | Edm.Int32 | Indicates whether the recurring planning is day of the month or weekday of the month |
|  | Description | True |  |  | Edm.String | Description of recurring planning |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Employee | True |  |  | Edm.Guid | Employee linked to the recurring planning |
|  | EmployeeCode | False |  |  | Edm.String | Code of employee |
|  | EmployeeHID | False |  |  | Edm.Int32 | Numeric ID of the employee |
|  | EndDate | False |  |  | Edm.DateTime | End date of the recurring planning |
|  | EndDateOrAfter | False |  |  | Edm.Int32 | Indicates whether the recurring planning is end on end date or end after number of times |
|  | EndTime | False |  |  | Edm.DateTime | End time for the recurring planning to be active |
|  | Hours | False |  |  | Edm.Double | Number of hours for the recurring planning |
|  | HourType | True |  |  | Edm.Guid | Hour type of the recurring planning, item with 'Time' type |
|  | HourTypeCode | False |  |  | Edm.String | Code of the hour type |
|  | HourTypeDescription | False |  |  | Edm.String | Description of the hour type |
|  | Modified | False |  |  | Edm.DateTime | Date modified |
|  | Modifier | False |  |  | Edm.Guid | Modifier user ID |
|  | ModifierFullName | False |  |  | Edm.String | Modifier name |
|  | MonthPatternDay | False |  |  | Edm.Byte | Day of the monthly recurring |
|  | MonthPatternOrdinalDay | False |  |  | Edm.Byte | Ordinal number of week day for the monthly recurring planning, 1 = first, 2 = second, 3 = third, 4 = fourth, 31 = last |
|  | MonthPatternOrdinalWeek | False |  |  | Edm.Byte | Ordinal week day of the monthly recurring planning, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday, 7 = Sunday |
|  | Notes | False |  |  | Edm.String | For additional information about recurring planning |
|  | NumberOfRecurrences | False |  |  | Edm.Int16 | Number of times the planning recurs |
|  | OverAllocate | False |  |  | Edm.Boolean | Indicates whether the entries can have over allocated planning hours |
|  | PatternFrequency | False |  |  | Edm.Byte | Number of planning times for weekly or monthly recurring planning |
|  | Project | False |  |  | Edm.Guid | Project linked to the recurring planning |
|  | ProjectCode | False |  |  | Edm.String | Code of project |
|  | ProjectDescription | False |  |  | Edm.String | Description of project |
|  | ProjectPlanningRecurringType | False |  |  | Edm.Byte | Type of the recurring planning, 1 = weekly, 2 = monthly |
|  | ProjectWBS | False |  |  | Edm.Guid | WBS linked to the recurring planning |
|  | ProjectWBSDescription | False |  |  | Edm.String | Description of WBS |
|  | StartDate | True |  |  | Edm.DateTime | Start date of the recurring planning |
|  | StartTime | False |  |  | Edm.DateTime | Start time for the recurring planning to be active |
|  | Status | True |  |  | Edm.Int16 | Status of the project planning, 1 = Reserved, 2 = Planned |
|  | WeekPatternDay | False |  |  | Edm.Byte | Week day for the weekly recurring planning |
|  | WeekPatternFriday | False |  |  | Edm.Boolean | Create planning on Friday, apply to weekly pattern recurring planning only |
|  | WeekPatternMonday | False |  |  | Edm.Boolean | Create planning on Monday, apply to weekly pattern recurring planning only |
|  | WeekPatternSaturday | False |  |  | Edm.Boolean | Create planning on Saturday, apply to weekly pattern recurring planning only |
|  | WeekPatternSunday | False |  |  | Edm.Boolean | Create planning on Sunday, apply to weekly pattern recurring planning only |
|  | WeekPatternThursday | False |  |  | Edm.Boolean | Create planning on Thursday, apply to weekly pattern recurring planning only |
|  | WeekPatternTuesday | False |  |  | Edm.Boolean | Create planning on Tuesday, apply to weekly pattern recurring planning only |
|  | WeekPatternWednesday | False |  |  | Edm.Boolean | Create planning on Wednesday, apply to weekly pattern recurring planning only |

## Returns

---

## ProjectRestrictionEmployeeItems

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectRestrictionEmployeeItems

## Endpoint

ProjectRestrictionEmployeeItems

## Good to know

Use this endpoint to create, read, update and delete project restriction employee items, it restricts employee's hour types that can be used in time entries for the project.

Note: For creating project restriction employee item, you need to have existing project restriction employee. The supplied item needs to be a time unit item.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectRestrictionEmployeeItems

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectRestrictionEmployeeItems

/api/v1/{division}/project/ProjectRestrictionEmployeeItems

/api/v1/{division}/project/ProjectRestrictionEmployeeItems

/api/v1/{division}/project/ProjectRestrictionEmployeeItems

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Date and time when the project restriction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the project restriction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the project restriction |
|  | Division | False |  |  | Edm.Int32 | Division of project and project restriction |
|  | Employee | True |  |  | Edm.Guid | The guid ID of the employee restricted to the project for hour entry |
|  | EmployeeFullName | False |  |  | Edm.String | The full name in string of the employee restricted to the project for hour entry |
|  | EmployeeHID | False |  |  | Edm.Int32 | The HID of the employee restricted to the project for hour entry |
|  | Item | True |  |  | Edm.Guid | ID of item that linked to the project restriction |
|  | ItemCode | False |  |  | Edm.String | Code of item that linked to the project restriction |
|  | ItemDescription | False |  |  | Edm.String | Description of item that linked to the project restriction |
|  | ItemIsTime | False |  |  | Edm.Byte | Indicates if the item is a time unit item |
|  | Modified | False |  |  | Edm.DateTime | Last date when the project restriction was modified |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the project restriction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the project restriction |
|  | Project | True |  |  | Edm.Guid | Project ID that the restriction is referenced to |
|  | ProjectCode | False |  |  | Edm.String | Project code that the restriction is referenced to |
|  | ProjectDescription | False |  |  | Edm.String | Project description that the restriction is referenced to |

## Returns

---

## ProjectRestrictionEmployees

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectRestrictionEmployees

## Endpoint

ProjectRestrictionEmployees

## Good to know

Use this endpoint to create, read, update and delete employees which are restricted to enter time/cost entries in specific project.

Note: For creating a project restriction link, it is mandatory to supply one or more Employee and Project.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectRestrictionEmployees

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectRestrictionEmployees

/api/v1/{division}/project/ProjectRestrictionEmployees

/api/v1/{division}/project/ProjectRestrictionEmployees

/api/v1/{division}/project/ProjectRestrictionEmployees

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Date and time when the project restriction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the project restriction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the project restriction |
|  | Division | False |  |  | Edm.Int32 | Division of project and project restriction |
|  | Employee | True |  |  | Edm.Guid | The guid ID of the employee restricted to the project for hour entry |
|  | EmployeeFullName | False |  |  | Edm.String | The full name in string of the employee restricted to the project for hour entry |
|  | EmployeeHID | False |  |  | Edm.Int32 | The HID of the employee restricted to the project for hour entry |
|  | Modified | False |  |  | Edm.DateTime | Last date when the project restriction was modified |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the project restriction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the project restriction |
|  | Project | True |  |  | Edm.Guid | Project ID that the restriction is referenced to |
|  | ProjectCode | False |  |  | Edm.String | Project code that the restriction is referenced to |
|  | ProjectDescription | False |  |  | Edm.String | Project description that the restriction is referenced to |

## Returns

---

## ProjectRestrictionItems

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectRestrictionItems

## Endpoint

ProjectRestrictionItems

## Good to know

Use this endpoint to restrict which hour/cost types can be used in time/cost entries for the project.

Note: For creating project restriction item, it is mandatory to supply Item and Project.

## Scope

Projects projects

## URI

/api/v1/{division}/project/ProjectRestrictionItems

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectRestrictionItems

/api/v1/{division}/project/ProjectRestrictionItems

/api/v1/{division}/project/ProjectRestrictionItems

/api/v1/{division}/project/ProjectRestrictionItems

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Date and time when the project restriction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the project restriction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the project restriction |
|  | Division | False |  |  | Edm.Int32 | Division of project and project restriction |
|  | Item | True |  |  | Edm.Guid | ID of item that linked to the project restriction |
|  | ItemCode | False |  |  | Edm.String | Code of item that linked to the project restriction |
|  | ItemDescription | False |  |  | Edm.String | Description of item that linked to the project restriction |
|  | ItemIsTime | False |  |  | Edm.Byte | Indicates if the item is a time unit item |
|  | Modified | False |  |  | Edm.DateTime | Last date when the project restriction was modified |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the project restriction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the project restriction |
|  | Project | True |  |  | Edm.Guid | Project ID that the restriction is referenced to |
|  | ProjectCode | False |  |  | Edm.String | Project code that the restriction is referenced to |
|  | ProjectDescription | False |  |  | Edm.String | Project description that the restriction is referenced to |

## Returns

---

## ProjectRestrictionRebillings

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectRestrictionRebillings

## Endpoint

ProjectRestrictionRebillings

## Good to know

This endpoint enables users to restrict which cost types the project allows rebilling to customer.

## Scope

Projects billing

## URI

/api/v1/{division}/project/ProjectRestrictionRebillings

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/ProjectRestrictionRebillings

/api/v1/{division}/project/ProjectRestrictionRebillings

/api/v1/{division}/project/ProjectRestrictionRebillings

/api/v1/{division}/project/ProjectRestrictionRebillings

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | CostTypeRebill | True |  |  | Edm.Guid | Cost type reference |
|  | CostTypeRebillCode | False |  |  | Edm.String | Cost type code |
|  | CostTypeRebillDescription | False |  |  | Edm.String | Cost type description |
|  | Created | False |  |  | Edm.DateTime | Date and time when the project restriction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the project restriction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the project restriction |
|  | Division | False |  |  | Edm.Int32 | Division of project and project restriction |
|  | Modified | False |  |  | Edm.DateTime | Last date when the project restriction was modified |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the project restriction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the project restriction |
|  | Project | True |  |  | Edm.Guid | Project ID that the restriction is referenced to |
|  | ProjectCode | False |  |  | Edm.String | Project code that the restriction is referenced to |
|  | ProjectDescription | False |  |  | Edm.String | Project description that the restriction is referenced to |

## Returns

---

## Projects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - Projects

## Endpoint

Projects

## Good to know

Use this endpoint to create, read, update and delete projects.

Note: Projects enable you to bundle quotations, sales invoices, and time and cost entries, so that you can track work and progress by project. For POST it is mandatory to provide Code, Description and Type.

This entity supports webhooks.
Subscribe to the topic Projects to get updates on the Projects resource. Note that you will also receive events on the Projects resource.

## Scope

Projects projects

## URI

/api/v1/{division}/project/Projects

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/Projects

/api/v1/{division}/project/Projects

/api/v1/{division}/project/Projects

/api/v1/{division}/project/Projects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Webhook ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid |  | Primary key |
|  | Account | False |  |  | Edm.Guid |  | The account for this project |
|  | AccountCode | False |  |  | Edm.String |  | Code of Account |
|  | AccountContact | False |  |  | Edm.Guid |  | Contact person of Account |
|  | AccountName | False |  |  | Edm.String |  | Name of Account |
|  | AllowAdditionalInvoicing | False |  |  | Edm.Boolean |  | Indicates if additional invoice is allowed for project |
|  | AllowMemberEntryOnly | False |  |  | Edm.Boolean |  | Allow only member to create time or cost entry |
|  | BlockEntry | False |  |  | Edm.Boolean |  | Block time and cost entries |
|  | BlockInvoicing | False |  |  | Edm.Boolean |  | Block invoicing |
|  | BlockPlanning | False |  |  | Edm.Boolean |  | Block planning and reservations |
|  | BlockPurchasing | False |  |  | Edm.Boolean |  | Block purchasing |
|  | BlockRebilling | False |  |  | Edm.Boolean |  | Block rebilling |
|  | BudgetedAmount | False |  |  | Edm.Double |  | Budgeted amount of sales in the default currency of the company |
|  | BudgetedCosts | False |  |  | Edm.Double |  | Budgeted amount of costs in the default currency of the company |
|  | BudgetedHoursPerHourType | False |  |  | BudgetedHoursPerHourType |  | Collection of budgeted hours |
|  | BudgetedRevenue | False |  |  | Edm.Double |  | Budgeted amount of revenue in the default currency of the company |
|  | BudgetOverrunHours | False |  |  | Edm.Byte |  | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | BudgetType | False |  |  | Edm.Int16 |  | Budget type |
|  | BudgetTypeDescription | False |  |  | Edm.String |  | Budget type description |
|  | Classification | False |  |  | Edm.Guid |  | Used only for PSA to link a project classification to the project |
|  | ClassificationDescription | False |  |  | Edm.String |  | Description of Classification |
|  | Code | True |  |  | Edm.String |  | Code Note :  Code is not mandatory in PSA packages.If no code is provided, project auto number will be used, but this can only be applied to PSA packages. |
|  | CostsAmountFC | False |  |  | Edm.Double |  | Used only for PSA to store the budgetted costs of a project (except for project type Campaign and Non-billable). Positive quantities only |
|  | Created | False |  |  | Edm.DateTime |  | Creation date |
|  | Creator | False |  |  | Edm.Guid |  | User ID of creator |
|  | CreatorFullName | False |  |  | Edm.String |  | Name of creator |
|  | CustomerPOnumber | False |  |  | Edm.String |  | Used only for PSA to store the customer's PO number |
|  | CustomField | False |  |  | Edm.String |  | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Description | True |  |  | Edm.String |  | Description of the project |
|  | Division | False |  |  | Edm.Int32 |  | Division code |
|  | DivisionName | False |  |  | Edm.String |  | Name of Division |
|  | EnableWorkInProgress | False |  |  | Edm.Boolean |  | Work in progress: To be invoiced |
|  | EndDate | False |  |  | Edm.DateTime |  | End date of the project. In combination with the start date the status is determined |
|  | FixedPriceItem | False |  |  | Edm.Guid |  | Item used for fixed price invoicing. To be defined per project. If empty the functionality relies on the setting |
|  | FixedPriceItemDescription | False |  |  | Edm.String |  | Description of FixedPriceItem |
|  | HasWBSLines | False |  |  | Edm.Boolean |  | Indicates if whether the Project has WBS |
|  | IncludeInvoiceSpecification | False |  |  | Edm.Int16 |  | Include invoice specification. E.g: 1 = Based on account, 2 = Always, 3 = Never |
|  | IncludeSpecificationInInvoicePdf | False |  |  | Edm.Boolean |  | Indicates whether to include invoice specification in invoice PDF |
|  | InternalNotes | False |  |  | Edm.String |  | Internal notes not to be printed in invoice |
|  | InvoiceAddress | False |  |  | Edm.Guid |  | Invoice address |
|  | InvoiceAsQuoted | False |  |  | Edm.Boolean |  | Indicates whether the project is invoice as quoted |
|  | InvoiceDescription | False |  |  | Edm.String |  | Description for generate project invoice |
|  | InvoiceTerms | False |  |  | InvoiceTerms |  | Collection of invoice terms |
|  | IsWBSRequiredForEntry | False |  |  | Edm.Byte |  | Indicates whether the project WBS is required for time and cost entry E.g: 0 = Based on company setting, 1 = Yes, 2 = No |
|  | Manager | False |  |  | Edm.Guid |  | Responsible person for this project |
|  | ManagerFullname | False |  |  | Edm.String |  | Name of Manager |
|  | MarkupPercentage | False |  |  | Edm.Double |  | Purchase markup percentage |
|  | Modified | False |  |  | Edm.DateTime |  | Last modified date |
|  | Modifier | False |  |  | Edm.Guid |  | User ID of modifier |
|  | ModifierFullName | False |  |  | Edm.String |  | Name of modifier |
|  | Notes | False |  |  | Edm.String |  | For additional information about projects |
|  | PaymentCondition | False |  |  | Edm.String |  | Payment condition code for this project |
|  | PrepaidItem | False |  |  | Edm.Guid |  | Used only for PSA. This item is used for prepaid invoicing. If left empty, the functionality relies on a setting |
|  | PrepaidItemDescription | False |  |  | Edm.String |  | Description of PrepaidItem |
|  | PrepaidType | False |  |  | Edm.Int16 |  | PrepaidType: 1-Retainer, 2-Hour type bundle |
|  | PrepaidTypeDescription | False |  |  | Edm.String |  | Description of PrepaidType |
|  | ProjectRestrictionEmployees | False |  |  | ProjectRestrictionEmployees |  | Collection of employee restrictions |
|  | ProjectRestrictionItems | False |  |  | ProjectRestrictionItems |  | Collection of item restrictions |
|  | ProjectRestrictionRebillings | False |  |  | ProjectRestrictionRebillings |  | Collection of rebilling restrictions |
|  | SalesTimeQuantity | False |  |  | Edm.Double |  | Budgeted time. Total number of hours estimated for the fixed price project |
|  | SourceQuotation | False |  |  | Edm.Guid |  | Source quotation |
|  | StartDate | False |  |  | Edm.DateTime |  | Start date of a project. In combination with the end date the status is determined |
|  | TimeQuantityToAlert | False |  |  | Edm.Double |  | Alert when exceeding (Hours) |
|  | Type | True |  |  | Edm.Int32 |  | Reference to ProjectTypes. E.g: 1 = Campaign , 2 = Fixed Price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid |
|  | TypeDescription | False |  |  | Edm.String |  | Description of Type |
|  | UseBillingMilestones | False |  |  | Edm.Boolean |  | Indicates whether the Project is using billing milestones |

## Returns

---

## ProjectWBSByProject

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectWBSByProject

## Endpoint

ProjectWBSByProject

## Good to know

Use this endpoint to read Work Breakdown Structure (WBS) information based on the project ID provided.

Note: WBS used as a method to separate deliverables and project work into smaller component. It allows better manage the scope of projects and clearly defining the expected deliverables and outcomes.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/ProjectWBSByProject

GET 
## Example usage

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AdditionalInvoicing | False |  |  | Edm.Byte | A boolean field to indicated if additional invoice is allowed on this WBS. (Obsolete) |
|  | BaselineDate | False |  |  | Edm.DateTime | Baseline date of this deliverable |
|  | BlockEntry | False |  |  | Edm.Boolean | A boolean field to indicated if time and cost entries is blocked |
|  | BlockRebilling | False |  |  | Edm.Boolean | A boolean field to indicated if rebilling is blocked |
|  | BudgetOverrunHours | False |  |  | Edm.Byte | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | Completed | False |  |  | Edm.Byte | A boolean field to indicated if the project WBS is completed |
|  | Cost | False |  |  | Edm.Double | Budget cost of the WBS |
|  | Created | False |  |  | Edm.DateTime | Date and time the project was created |
|  | Creator | False |  |  | Edm.Guid | The Guid ID of user that created the project |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DefaultItem | False |  |  | Edm.Guid | Default Item to used for timecost entry |
|  | DefaultItemIsMandatory | False |  |  | Edm.Byte | To indicated if only default item is allowed |
|  | Description | True |  |  | Edm.String | Description of the project WBS |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | EndDate of the WBS. If it is a deliverable then EndDate is the lastest EndDate of its children |
|  | Hours | False |  |  | Edm.Double | Budget quantity of the WBS |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. For activity: null = According to parent, 2 = Fixed price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid. For expense: null = According to parent, 6 = Fixed, 7 = Rebill, 8 = Non re-billable |
|  | IsBaseline | False |  |  | Edm.Byte | A boolean field to indicated if this is a baseline |
|  | Milestone | False |  |  | Edm.Byte | A boolean field to indicated if this is a milestone |
|  | Modified | False |  |  | Edm.DateTime | Last modified date and time |
|  | Modifier | False |  |  | Edm.Guid | The Guid ID of the user that modified the records |
|  | Notes | False |  |  | Edm.String | For additional information about wbs |
|  | Parent | False |  |  | Edm.Guid | ID of the parent WBS |
|  | Project | False |  |  | Edm.Guid | ID of the project that linked to WBS |
|  | ProjectTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | PurchaseMarkupPercentage | False |  |  | Edm.Double | Markup percentage |
|  | PurchasePrice | False |  |  | Edm.Double | Purchase price of the item. Only for expense |
|  | Quantity | False |  |  | Edm.Double | Quantity of the WBS. Only for expense |
|  | Revenue | False |  |  | Edm.Double | Revenue of the WBS |
|  | StartDate | False |  |  | Edm.DateTime | Startdate of the WBS. If it is a deliverable then StartDate is the earliest StartDate of its children |
|  | Supplier | False |  |  | Edm.Guid | Supplier of the item. Only for expense |
|  | TimeQuantityToAlert | False |  |  | Edm.Double | Alert when exceeding this time quantity |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |

## Returns

---

## ProjectWBSByProject - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectWBSByProject

## Endpoint

ProjectWBSByProject

## Good to know

Use this endpoint to read Work Breakdown Structure (WBS) information based on the project ID provided.

Note: WBS used as a method to separate deliverables and project work into smaller component. It allows better manage the scope of projects and clearly defining the expected deliverables and outcomes.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/ProjectWBSByProject

GET 
## Example usage

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

/api/v1/{division}/read/project/ProjectWBSByProject

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AdditionalInvoicing | False |  |  | Edm.Byte | A boolean field to indicated if additional invoice is allowed on this WBS. (Obsolete) |
|  | BaselineDate | False |  |  | Edm.DateTime | Baseline date of this deliverable |
|  | BlockEntry | False |  |  | Edm.Boolean | A boolean field to indicated if time and cost entries is blocked |
|  | BlockRebilling | False |  |  | Edm.Boolean | A boolean field to indicated if rebilling is blocked |
|  | BudgetOverrunHours | False |  |  | Edm.Byte | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | Completed | False |  |  | Edm.Byte | A boolean field to indicated if the project WBS is completed |
|  | Cost | False |  |  | Edm.Double | Budget cost of the WBS |
|  | Created | False |  |  | Edm.DateTime | Date and time the project was created |
|  | Creator | False |  |  | Edm.Guid | The Guid ID of user that created the project |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DefaultItem | False |  |  | Edm.Guid | Default Item to used for timecost entry |
|  | DefaultItemIsMandatory | False |  |  | Edm.Byte | To indicated if only default item is allowed |
|  | Description | True |  |  | Edm.String | Description of the project WBS |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | EndDate of the WBS. If it is a deliverable then EndDate is the lastest EndDate of its children |
|  | Hours | False |  |  | Edm.Double | Budget quantity of the WBS |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. For activity: null = According to parent, 2 = Fixed price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid. For expense: null = According to parent, 6 = Fixed, 7 = Rebill, 8 = Non re-billable |
|  | IsBaseline | False |  |  | Edm.Byte | A boolean field to indicated if this is a baseline |
|  | Milestone | False |  |  | Edm.Byte | A boolean field to indicated if this is a milestone |
|  | Modified | False |  |  | Edm.DateTime | Last modified date and time |
|  | Modifier | False |  |  | Edm.Guid | The Guid ID of the user that modified the records |
|  | Notes | False |  |  | Edm.String | For additional information about wbs |
|  | Parent | False |  |  | Edm.Guid | ID of the parent WBS |
|  | Project | False |  |  | Edm.Guid | ID of the project that linked to WBS |
|  | ProjectTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | PurchaseMarkupPercentage | False |  |  | Edm.Double | Markup percentage |
|  | PurchasePrice | False |  |  | Edm.Double | Purchase price of the item. Only for expense |
|  | Quantity | False |  |  | Edm.Double | Quantity of the WBS. Only for expense |
|  | Revenue | False |  |  | Edm.Double | Revenue of the WBS |
|  | StartDate | False |  |  | Edm.DateTime | Startdate of the WBS. If it is a deliverable then StartDate is the earliest StartDate of its children |
|  | Supplier | False |  |  | Edm.Guid | Supplier of the item. Only for expense |
|  | TimeQuantityToAlert | False |  |  | Edm.Double | Alert when exceeding this time quantity |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |

## Returns

---

## ProjectWBSByProjectAndWBS

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectWBSByProjectAndWBS

## Endpoint

ProjectWBSByProjectAndWBS

## Good to know

This endpoint enables users to retrieve Work Breakdown Structure (WBS) line information based on the project ID And WBS ID provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

GET 
## Example usage

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AdditionalInvoicing | False |  |  | Edm.Byte | A boolean field to indicated if additional invoice is allowed on this WBS. (Obsolete) |
|  | BaselineDate | False |  |  | Edm.DateTime | Baseline date of this deliverable |
|  | BlockEntry | False |  |  | Edm.Boolean | A boolean field to indicated if time and cost entries is blocked |
|  | BlockRebilling | False |  |  | Edm.Boolean | A boolean field to indicated if rebilling is blocked |
|  | BudgetOverrunHours | False |  |  | Edm.Byte | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | Completed | False |  |  | Edm.Byte | A boolean field to indicated if the project WBS is completed |
|  | Cost | False |  |  | Edm.Double | Budget cost of the WBS |
|  | Created | False |  |  | Edm.DateTime | Date and time the project was created |
|  | Creator | False |  |  | Edm.Guid | The Guid ID of user that created the project |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DefaultItem | False |  |  | Edm.Guid | Default Item to used for timecost entry |
|  | DefaultItemIsMandatory | False |  |  | Edm.Byte | To indicated if only default item is allowed |
|  | Description | True |  |  | Edm.String | Description of the project WBS |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | EndDate of the WBS. If it is a deliverable then EndDate is the lastest EndDate of its children |
|  | Hours | False |  |  | Edm.Double | Budget quantity of the WBS |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. For activity: null = According to parent, 2 = Fixed price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid. For expense: null = According to parent, 6 = Fixed, 7 = Rebill, 8 = Non re-billable |
|  | IsBaseline | False |  |  | Edm.Byte | A boolean field to indicated if this is a baseline |
|  | Milestone | False |  |  | Edm.Byte | A boolean field to indicated if this is a milestone |
|  | Modified | False |  |  | Edm.DateTime | Last modified date and time |
|  | Modifier | False |  |  | Edm.Guid | The Guid ID of the user that modified the records |
|  | Notes | False |  |  | Edm.String | For additional information about wbs |
|  | Parent | False |  |  | Edm.Guid | ID of the parent WBS |
|  | Project | False |  |  | Edm.Guid | ID of the project that linked to WBS |
|  | ProjectTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | PurchaseMarkupPercentage | False |  |  | Edm.Double | Markup percentage |
|  | PurchasePrice | False |  |  | Edm.Double | Purchase price of the item. Only for expense |
|  | Quantity | False |  |  | Edm.Double | Quantity of the WBS. Only for expense |
|  | Revenue | False |  |  | Edm.Double | Revenue of the WBS |
|  | StartDate | False |  |  | Edm.DateTime | Startdate of the WBS. If it is a deliverable then StartDate is the earliest StartDate of its children |
|  | Supplier | False |  |  | Edm.Guid | Supplier of the item. Only for expense |
|  | TimeQuantityToAlert | False |  |  | Edm.Double | Alert when exceeding this time quantity |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |

## Returns

---

## ProjectWBSByProjectAndWBS - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - ProjectWBSByProjectAndWBS

## Endpoint

ProjectWBSByProjectAndWBS

## Good to know

This endpoint enables users to retrieve Work Breakdown Structure (WBS) line information based on the project ID And WBS ID provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects projects

## Function URI

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

GET 
## Example usage

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

/api/v1/{division}/read/project/ProjectWBSByProjectAndWBS

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AdditionalInvoicing | False |  |  | Edm.Byte | A boolean field to indicated if additional invoice is allowed on this WBS. (Obsolete) |
|  | BaselineDate | False |  |  | Edm.DateTime | Baseline date of this deliverable |
|  | BlockEntry | False |  |  | Edm.Boolean | A boolean field to indicated if time and cost entries is blocked |
|  | BlockRebilling | False |  |  | Edm.Boolean | A boolean field to indicated if rebilling is blocked |
|  | BudgetOverrunHours | False |  |  | Edm.Byte | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | Completed | False |  |  | Edm.Byte | A boolean field to indicated if the project WBS is completed |
|  | Cost | False |  |  | Edm.Double | Budget cost of the WBS |
|  | Created | False |  |  | Edm.DateTime | Date and time the project was created |
|  | Creator | False |  |  | Edm.Guid | The Guid ID of user that created the project |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DefaultItem | False |  |  | Edm.Guid | Default Item to used for timecost entry |
|  | DefaultItemIsMandatory | False |  |  | Edm.Byte | To indicated if only default item is allowed |
|  | Description | True |  |  | Edm.String | Description of the project WBS |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | EndDate of the WBS. If it is a deliverable then EndDate is the lastest EndDate of its children |
|  | Hours | False |  |  | Edm.Double | Budget quantity of the WBS |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. For activity: null = According to parent, 2 = Fixed price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid. For expense: null = According to parent, 6 = Fixed, 7 = Rebill, 8 = Non re-billable |
|  | IsBaseline | False |  |  | Edm.Byte | A boolean field to indicated if this is a baseline |
|  | Milestone | False |  |  | Edm.Byte | A boolean field to indicated if this is a milestone |
|  | Modified | False |  |  | Edm.DateTime | Last modified date and time |
|  | Modifier | False |  |  | Edm.Guid | The Guid ID of the user that modified the records |
|  | Notes | False |  |  | Edm.String | For additional information about wbs |
|  | Parent | False |  |  | Edm.Guid | ID of the parent WBS |
|  | Project | False |  |  | Edm.Guid | ID of the project that linked to WBS |
|  | ProjectTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | PurchaseMarkupPercentage | False |  |  | Edm.Double | Markup percentage |
|  | PurchasePrice | False |  |  | Edm.Double | Purchase price of the item. Only for expense |
|  | Quantity | False |  |  | Edm.Double | Quantity of the WBS. Only for expense |
|  | Revenue | False |  |  | Edm.Double | Revenue of the WBS |
|  | StartDate | False |  |  | Edm.DateTime | Startdate of the WBS. If it is a deliverable then StartDate is the earliest StartDate of its children |
|  | Supplier | False |  |  | Edm.Guid | Supplier of the item. Only for expense |
|  | TimeQuantityToAlert | False |  |  | Edm.Double | Alert when exceeding this time quantity |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |

## Returns

---

## RecentCosts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentCosts

## Endpoint

RecentCosts

## Scope

Projects projects

## URI

/api/v1/{division}/read/project/RecentCosts

GET 
## Example usage

/api/v1/{division}/read/project/RecentCosts

/api/v1/{division}/read/project/RecentCosts

/api/v1/{division}/read/project/RecentCosts

/api/v1/{division}/read/project/RecentCosts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## RecentCostsByNumberOfWeeks

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentCostsByNumberOfWeeks

## Endpoint

RecentCostsByNumberOfWeeks

## Good to know

Use this endpoint to read cost entries in the last specified number of ISO weeks.
For time and billing project users to gather insight on the cost based on status by the user per week ordered by the most recent date, in turn aid in generate powerful reports.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

GET 
## Example usage

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## RecentCostsByNumberOfWeeks - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentCostsByNumberOfWeeks

## Endpoint

RecentCostsByNumberOfWeeks

## Good to know

Use this endpoint to read cost entries in the last specified number of ISO weeks.
For time and billing project users to gather insight on the cost based on status by the user per week ordered by the most recent date, in turn aid in generate powerful reports.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

GET 
## Example usage

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeks

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## RecentCostsByNumberOfWeeksByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentCostsByNumberOfWeeksByDate

## Endpoint

RecentCostsByNumberOfWeeksByDate

## Good to know

Use this endpoint to read cost entries in the last specified number of ISO weeks based on a reference date.
For time and billing project users to gather insight on the cost based on status by the user per week ordered by a reference date, in turn aid in generate powerful reports.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

GET 
## Example usage

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## RecentCostsByNumberOfWeeksByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentCostsByNumberOfWeeksByDate

## Endpoint

RecentCostsByNumberOfWeeksByDate

## Good to know

Use this endpoint to read cost entries in the last specified number of ISO weeks based on a reference date.
For time and billing project users to gather insight on the cost based on status by the user per week ordered by a reference date, in turn aid in generate powerful reports.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

GET 
## Example usage

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentCostsByNumberOfWeeksByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | AmountApproved | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been approved |
|  | AmountDraft | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been saved as draft |
|  | AmountRejected | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been rejected |
|  | AmountSubmitted | False |  |  | Edm.Double | The total amount of (Quantity * Sales price of cost item) that has been submitted |
|  | CurrencyCode | False |  |  | Edm.String | Code of sales currency which is used in the cost item |
|  | Date | False |  |  | Edm.DateTime | Date of entry |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | Expense | False |  |  | Edm.Guid | The ID of the Expense that is linked to the project |
|  | ExpenseDescription | False |  |  | Edm.String | The description of the Expense that is linked to the project |
|  | ItemCode | False |  |  | Edm.String | Code of the item used for cost entry |
|  | ItemDescription | False |  |  | Edm.String | Description of the item used for cost entry |
|  | ItemId | False |  |  | Edm.Guid | ID of the item used for cost entry |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the cost entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the costs are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the costs are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the costs are entered on |
|  | QuantityApproved | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are approved |
|  | QuantityDraft | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are saved as draft |
|  | QuantityRejected | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are rejected |
|  | QuantitySubmitted | False |  |  | Edm.Double | Quantity of items that is used in cost entry that are submitted |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the cost entries have been entered on |

## Returns

---

## RecentHours

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentHours

## Endpoint

RecentHours

## Good to know

This endpoint enables users to retrieve hour entries in the last 4 ISO weeks, including the current week. The list is ordered by most recent date first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/RecentHours

GET 
## Example usage

/api/v1/{division}/read/project/RecentHours

/api/v1/{division}/read/project/RecentHours

/api/v1/{division}/read/project/RecentHours

/api/v1/{division}/read/project/RecentHours

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## RecentHoursByNumberOfWeeks

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentHoursByNumberOfWeeks

## Endpoint

RecentHoursByNumberOfWeeks

## Good to know

Use this endpoint to read hour entries in the last specified number of ISO weeks.
For time and billing project users to gather insight on the amount of hours based on status by the user per week ordered by the most recent date, in turn aid in generate powerful reports.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

GET 
## Example usage

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## RecentHoursByNumberOfWeeks - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentHoursByNumberOfWeeks

## Endpoint

RecentHoursByNumberOfWeeks

## Good to know

Use this endpoint to read hour entries in the last specified number of ISO weeks.
For time and billing project users to gather insight on the amount of hours based on status by the user per week ordered by the most recent date, in turn aid in generate powerful reports.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

GET 
## Example usage

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeks

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## RecentHoursByNumberOfWeeksByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentHoursByNumberOfWeeksByDate

## Endpoint

RecentHoursByNumberOfWeeksByDate

## Good to know

Use this endpoint to read hour entries in the last specified number of ISO weeks based on a reference date.
For time and billing project users to gather insight on the amount of hours based on status by the user per week ordered by a reference date, in turn aid in generate powerful reports.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

GET 
## Example usage

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## RecentHoursByNumberOfWeeksByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - RecentHoursByNumberOfWeeksByDate

## Endpoint

RecentHoursByNumberOfWeeksByDate

## Good to know

Use this endpoint to read hour entries in the last specified number of ISO weeks based on a reference date.
For time and billing project users to gather insight on the amount of hours based on status by the user per week ordered by a reference date, in turn aid in generate powerful reports.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

GET 
## Example usage

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

/api/v1/{division}/read/project/RecentHoursByNumberOfWeeksByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | Id | False |  |  | Edm.Int32 | Primary key |
|  | AccountCode | False |  |  | Edm.String | Code of account linked to the project that hours are being entered to |
|  | AccountId | False |  |  | Edm.Guid | ID of account linked to the project that hours are being entered to |
|  | AccountName | False |  |  | Edm.String | Name of account linked to the project that hours are being entered to |
|  | Activity | False |  |  | Edm.Guid | The activity of the project that the hours are entered to |
|  | ActivityDescription | False |  |  | Edm.String | Name of activity of the project that the hours are entered to |
|  | Date | False |  |  | Edm.DateTime | Date of hour entry record by week |
|  | EntryId | False |  |  | Edm.Guid | Entry ID of record |
|  | HoursApproved | False |  |  | Edm.Double | Hours approved |
|  | HoursApprovedBillable | False |  |  | Edm.Double | Billable hours that is approved |
|  | HoursDraft | False |  |  | Edm.Double | Hours saved as draft |
|  | HoursDraftBillable | False |  |  | Edm.Double | Billable hours saved as draft |
|  | HoursRejected | False |  |  | Edm.Double | Hours that are rejected |
|  | HoursRejectedBillable | False |  |  | Edm.Double | Billable hours that are rejected |
|  | HoursSubmitted | False |  |  | Edm.Double | Hours that are submitted |
|  | HoursSubmittedBillable | False |  |  | Edm.Double | Billable hours that are submitted |
|  | ItemCode | False |  |  | Edm.String | Code of the item that is used for hours |
|  | ItemDescription | False |  |  | Edm.String | Description of the item that is used for hours |
|  | ItemId | False |  |  | Edm.Guid | ID of the item that is used for hours |
|  | Notes | False |  |  | Edm.String | Notes entered regarding the information of the hours entered |
|  | ProjectCode | False |  |  | Edm.String | Code of project that the hours are entered on |
|  | ProjectDescription | False |  |  | Edm.String | Description of project that the hours are entered on |
|  | ProjectId | False |  |  | Edm.Guid | ID of project that the hours are entered on |
|  | WeekNumber | False |  |  | Edm.Int32 | The week number that the hours are entered on |

## Returns

---

## TimeAndBillingAccountDetails

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingAccountDetails

## Endpoint

TimeAndBillingAccountDetails

## Good to know

This endpoint enables users to retrieve the account details.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingAccountDetails

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingAccountDetails

/api/v1/{division}/read/project/TimeAndBillingAccountDetails

/api/v1/{division}/read/project/TimeAndBillingAccountDetails

/api/v1/{division}/read/project/TimeAndBillingAccountDetails

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Name | False |  |  | Edm.String | Name |

## Returns

---

## TimeAndBillingAccountDetailsByID

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingAccountDetailsByID

## Endpoint

TimeAndBillingAccountDetailsByID

## Good to know

This endpoint enables users to retrieve the account details.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Name | False |  |  | Edm.String | Name |

## Returns

---

## TimeAndBillingAccountDetailsByID - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingAccountDetailsByID

## Endpoint

TimeAndBillingAccountDetailsByID

## Good to know

This endpoint enables users to retrieve the account details.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

/api/v1/{division}/read/project/TimeAndBillingAccountDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Name | False |  |  | Edm.String | Name |

## Returns

---

## TimeAndBillingActivitiesAndExpenses

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingActivitiesAndExpenses

## Endpoint

TimeAndBillingActivitiesAndExpenses

## Good to know

Use this endpoint to retrieve a list of Activities, Expenses and its parent Deliverable.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingActivitiesAndExpenses

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | ID of activity or expense |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description of activity or expense |
|  | ParentDescription | False |  |  | Edm.String | Description of its parent |

## Returns

---

## TimeAndBillingEntryAccounts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryAccounts

## Endpoint

TimeAndBillingEntryAccounts

## Good to know

This endpoint enables users to retrieve currently active account details.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryAccounts

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | ID of account used for entries |
|  | AccountName | False |  |  | Edm.String | Name of account |

## Returns

---

## TimeAndBillingEntryAccountsByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryAccountsByDate

## Endpoint

TimeAndBillingEntryAccountsByDate

## Good to know

This endpoint enables users to retrieve all accounts still active as of the date provided as the parameter.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | ID of account used for entries |
|  | AccountName | False |  |  | Edm.String | Name of account |

## Returns

---

## TimeAndBillingEntryAccountsByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryAccountsByDate

## Endpoint

TimeAndBillingEntryAccountsByDate

## Good to know

This endpoint enables users to retrieve all accounts still active as of the date provided as the parameter.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | ID of account used for entries |
|  | AccountName | False |  |  | Edm.String | Name of account |

## Returns

---

## TimeAndBillingEntryAccountsByProjectAndDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryAccountsByProjectAndDate

## Endpoint

TimeAndBillingEntryAccountsByProjectAndDate

## Good to know

This endpoint enables users to retrieve the account related to the project ID as of the date provided as the parameters.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | ID of account used for entries |
|  | AccountName | False |  |  | Edm.String | Name of account |

## Returns

---

## TimeAndBillingEntryAccountsByProjectAndDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryAccountsByProjectAndDate

## Endpoint

TimeAndBillingEntryAccountsByProjectAndDate

## Good to know

This endpoint enables users to retrieve the account related to the project ID as of the date provided as the parameters.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryAccountsByProjectAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | ID of account used for entries |
|  | AccountName | False |  |  | Edm.String | Name of account |

## Returns

---

## TimeAndBillingEntryProjects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryProjects

## Endpoint

TimeAndBillingEntryProjects

## Good to know

This endpoint enables users to retrieve project code and project description based on the project ID provided.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryProjects

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryProjects

/api/v1/{division}/read/project/TimeAndBillingEntryProjects

/api/v1/{division}/read/project/TimeAndBillingEntryProjects

/api/v1/{division}/read/project/TimeAndBillingEntryProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | GUID id of the project |
|  | ProjectCode | False |  |  | Edm.String | Code of the project |
|  | ProjectDescription | False |  |  | Edm.String | Description of the project |

## Returns

---

## TimeAndBillingEntryProjectsByAccountAndDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryProjectsByAccountAndDate

## Endpoint

TimeAndBillingEntryProjectsByAccountAndDate

## Good to know

This endpoint enables users to retrieve a list of projects allowed for an employee based on the Account and Date provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | GUID id of the project |
|  | ProjectCode | False |  |  | Edm.String | Code of the project |
|  | ProjectDescription | False |  |  | Edm.String | Description of the project |

## Returns

---

## TimeAndBillingEntryProjectsByAccountAndDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryProjectsByAccountAndDate

## Endpoint

TimeAndBillingEntryProjectsByAccountAndDate

## Good to know

This endpoint enables users to retrieve a list of projects allowed for an employee based on the Account and Date provided.
For this function to work correctly, you must supply all parameters.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByAccountAndDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | GUID id of the project |
|  | ProjectCode | False |  |  | Edm.String | Code of the project |
|  | ProjectDescription | False |  |  | Edm.String | Description of the project |

## Returns

---

## TimeAndBillingEntryProjectsByDate

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryProjectsByDate

## Endpoint

TimeAndBillingEntryProjectsByDate

## Good to know

Use this endpoint to read a list of projects allowed for an employee based on the Date provided.

Note: For getting the list, it is mandatory to supply check date.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | GUID id of the project |
|  | ProjectCode | False |  |  | Edm.String | Code of the project |
|  | ProjectDescription | False |  |  | Edm.String | Description of the project |

## Returns

---

## TimeAndBillingEntryProjectsByDate - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryProjectsByDate

## Endpoint

TimeAndBillingEntryProjectsByDate

## Good to know

Use this endpoint to read a list of projects allowed for an employee based on the Date provided.

Note: For getting the list, it is mandatory to supply check date.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

/api/v1/{division}/read/project/TimeAndBillingEntryProjectsByDate

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | GUID id of the project |
|  | ProjectCode | False |  |  | Edm.String | Code of the project |
|  | ProjectDescription | False |  |  | Edm.String | Description of the project |

## Returns

---

## TimeAndBillingEntryRecentAccounts

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryRecentAccounts

## Endpoint

TimeAndBillingEntryRecentAccounts

## Good to know

This endpoint enables users to retrieve a list of Accounts used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts

/api/v1/{division}/read/project/TimeAndBillingEntryRecentAccounts

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | AccountId | False |  |  | Edm.Guid | Guid ID of the account used for hour entries |
|  | AccountName | False |  |  | Edm.String | Name of account |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the account has been used for hour entry |

## Returns

---

## TimeAndBillingEntryRecentActivitiesAndExpenses

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryRecentActivitiesAndExpenses

## Endpoint

TimeAndBillingEntryRecentActivitiesAndExpenses

## Good to know

This endpoint enables users to retrieve a list of Activites and Expenses together with its corresponding parent Deliverable used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses

/api/v1/{division}/read/project/TimeAndBillingEntryRecentActivitiesAndExpenses

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | DateLastUsed | False |  |  | Edm.DateTime | Date last used |
|  | DefaultItem | False |  |  | Edm.Guid | ID of the defaultItem |
|  | DefaultItemCode | False |  |  | Edm.String | Item code of the defaultItem |
|  | DefaultItemDescription | False |  |  | Edm.String | Description of the defaultItem |
|  | Description | False |  |  | Edm.String | Description |
|  | ParentDescription | False |  |  | Edm.String | Description of Parent |

## Returns

---

## TimeAndBillingEntryRecentHourCostTypes

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryRecentHourCostTypes

## Endpoint

TimeAndBillingEntryRecentHourCostTypes

## Good to know

This endpoint enables users to retrieve a list of Items used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes

/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes

/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes

/api/v1/{division}/read/project/TimeAndBillingEntryRecentHourCostTypes

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ItemId | False |  |  | Edm.Guid | Guid ID of the item used for hour entries |
|  | DateLastUsed | False |  |  | Edm.DateTime | The last date that the item has been used for hour entry |
|  | IsValid | False |  |  | Edm.Boolean | Optional property indicating if the type is still valid for new entries. Can be used to show valid defaults |
|  | ItemCode | False |  |  | Edm.String | Code of the item |
|  | ItemDescription | False |  |  | Edm.String | Description of item |

## Returns

---

## TimeAndBillingEntryRecentProjects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingEntryRecentProjects

## Endpoint

TimeAndBillingEntryRecentProjects

## Good to know

This endpoint enables users to retrieve a list of Projects used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects

/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects

/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects

/api/v1/{division}/read/project/TimeAndBillingEntryRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## TimeAndBillingItemDetails

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingItemDetails

## Endpoint

TimeAndBillingItemDetails

## Good to know

This endpoint enables users to retrieve a list of Items with details.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingItemDetails

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingItemDetails

/api/v1/{division}/read/project/TimeAndBillingItemDetails

/api/v1/{division}/read/project/TimeAndBillingItemDetails

/api/v1/{division}/read/project/TimeAndBillingItemDetails

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | The code of the item used in time and billing projects |
|  | Description | False |  |  | Edm.String | The description of the item used in time and billing projects |
|  | IsFractionAllowedItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item's quantity is allowed to be used in fraction's, which changes the calculation of the total amount invoiced |
|  | IsSalesItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item is enabled to be used in a invoice proposal |
|  | SalesCurrency | False |  |  | Edm.String | The code of the sales currency used in this item |
|  | SalesPrice | False |  |  | Edm.Double | Sales price of the item which is used when processing sales invoice |

## Returns

---

## TimeAndBillingItemDetailsByID

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingItemDetailsByID

## Endpoint

TimeAndBillingItemDetailsByID

## Good to know

Use this endpoint to read an Item used in hour and cost entries with details based on the Item Id provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | The code of the item used in time and billing projects |
|  | Description | False |  |  | Edm.String | The description of the item used in time and billing projects |
|  | IsFractionAllowedItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item's quantity is allowed to be used in fraction's, which changes the calculation of the total amount invoiced |
|  | IsSalesItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item is enabled to be used in a invoice proposal |
|  | SalesCurrency | False |  |  | Edm.String | The code of the sales currency used in this item |
|  | SalesPrice | False |  |  | Edm.Double | Sales price of the item which is used when processing sales invoice |

## Returns

---

## TimeAndBillingItemDetailsByID - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingItemDetailsByID

## Endpoint

TimeAndBillingItemDetailsByID

## Good to know

Use this endpoint to read an Item used in hour and cost entries with details based on the Item Id provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

/api/v1/{division}/read/project/TimeAndBillingItemDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Code | False |  |  | Edm.String | The code of the item used in time and billing projects |
|  | Description | False |  |  | Edm.String | The description of the item used in time and billing projects |
|  | IsFractionAllowedItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item's quantity is allowed to be used in fraction's, which changes the calculation of the total amount invoiced |
|  | IsSalesItem | False |  |  | Edm.Boolean | A boolean field to indicated if this item is enabled to be used in a invoice proposal |
|  | SalesCurrency | False |  |  | Edm.String | The code of the sales currency used in this item |
|  | SalesPrice | False |  |  | Edm.Double | Sales price of the item which is used when processing sales invoice |

## Returns

---

## TimeAndBillingProjectDetails

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingProjectDetails

## Endpoint

TimeAndBillingProjectDetails

## Good to know

This endpoint enables users to retrieve a list of Projects with details.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingProjectDetails

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingProjectDetails

/api/v1/{division}/read/project/TimeAndBillingProjectDetails

/api/v1/{division}/read/project/TimeAndBillingProjectDetails

/api/v1/{division}/read/project/TimeAndBillingProjectDetails

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | False |  |  | Edm.Guid | The ID of the account that the project is linked to |
|  | AccountName | False |  |  | Edm.String | The name of the account that the project is linked to |
|  | Code | False |  |  | Edm.String | The code of the account that the project is linked to |
|  | Description | False |  |  | Edm.String | The description of the account that project is linked to |
|  | Type | False |  |  | Edm.Int32 | The project type. E.g: 1 = Campaign, 2 = Fixed Price, 3 = Time and Material, 4 = Non Billable, 5 = Prepaid |

## Returns

---

## TimeAndBillingProjectDetailsByID

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingProjectDetailsByID

## Endpoint

TimeAndBillingProjectDetailsByID

## Good to know

Use this endpoint to read and retrieve time and billing project details based on the project ID provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | False |  |  | Edm.Guid | The ID of the account that the project is linked to |
|  | AccountName | False |  |  | Edm.String | The name of the account that the project is linked to |
|  | Code | False |  |  | Edm.String | The code of the account that the project is linked to |
|  | Description | False |  |  | Edm.String | The description of the account that project is linked to |
|  | Type | False |  |  | Edm.Int32 | The project type. E.g: 1 = Campaign, 2 = Fixed Price, 3 = Time and Material, 4 = Non Billable, 5 = Prepaid |

## Returns

---

## TimeAndBillingProjectDetailsByID - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingProjectDetailsByID

## Endpoint

TimeAndBillingProjectDetailsByID

## Good to know

Use this endpoint to read and retrieve time and billing project details based on the project ID provided.

## Scope

Projects billing

## Function URI

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

/api/v1/{division}/read/project/TimeAndBillingProjectDetailsByID

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Account | False |  |  | Edm.Guid | The ID of the account that the project is linked to |
|  | AccountName | False |  |  | Edm.String | The name of the account that the project is linked to |
|  | Code | False |  |  | Edm.String | The code of the account that the project is linked to |
|  | Description | False |  |  | Edm.String | The description of the account that project is linked to |
|  | Type | False |  |  | Edm.Int32 | The project type. E.g: 1 = Campaign, 2 = Fixed Price, 3 = Time and Material, 4 = Non Billable, 5 = Prepaid |

## Returns

---

## TimeAndBillingRecentProjects

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingRecentProjects

## Endpoint

TimeAndBillingRecentProjects

## Good to know

This endpoint enables users to retrieve a list of Projects used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## TimeAndBillingRecentProjects - Function Details

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeAndBillingRecentProjects

## Endpoint

TimeAndBillingRecentProjects

## Good to know

This endpoint enables users to retrieve a list of Projects used by an employee for hour and cost entries. The list is ordered by the most recently used first.

## Scope

Projects billing

## URI

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

GET 
## Example usage

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

/api/v1/{division}/read/project/TimeAndBillingRecentProjects

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ProjectId | False |  |  | Edm.Guid | The Id of the project that hours entries are entered |
|  | DateLastUsed | False |  |  | Edm.DateTime | The datetime the hour entries have been entered on the project |
|  | ProjectCode | False |  |  | Edm.String | The code of the project that the hour entries have been entered on |
|  | ProjectDescription | False |  |  | Edm.String | The description of the project that the hour entries have been entered on |

## Returns

---

## TimeCorrections

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeCorrections

## Endpoint

TimeCorrections

## Good to know

Use this endpoint to create, read, update and delete time correction to correct final time entries that already invoiced.

## Scope

Projects billing

## URI

/api/v1/{division}/project/TimeCorrections

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/TimeCorrections

/api/v1/{division}/project/TimeCorrections

/api/v1/{division}/project/TimeCorrections

/api/v1/{division}/project/TimeCorrections

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Created | False |  |  | Edm.DateTime | Date and time when the time correction was created |
|  | Creator | False |  |  | Edm.Guid | ID of user that created the time correction |
|  | CreatorFullName | False |  |  | Edm.String | Full name of user that created the time correction |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Modified | False |  |  | Edm.DateTime | Last modified date of time correction |
|  | Modifier | False |  |  | Edm.Guid | ID of user that modified the time correction |
|  | ModifierFullName | False |  |  | Edm.String | Full name of user that modified the time correction |
|  | Notes | False |  |  | Edm.String | Notes of time correction for providing additional information |
|  | OriginalEntryId | False |  |  | Edm.Guid | Reference to the time entry that this corrects for |
|  | Quantity | False |  |  | Edm.Double | Quantity has to be negative value. E.g.: If original quantity is 10 and the correct quantity is 4, this quantity is -6 |

## Returns

---

## TimeTransactions

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - TimeTransactions

## Endpoint

TimeTransactions

## Good to know

Use this endpoint to create, read, update and delete time transaction of the user.

Note: For creating a time transaction, it is mandatory to supply one of the following properties
 • Account
 • Project
 • Subscription
 And always supply
 • Item
 • Quantity

This entity supports webhooks.
Subscribe to TimeTransactions topic to get updates on the Time resource. Note that you will also receive events on the TimeTransactions resource.

## Scope

Projects billing

## URI

/api/v1/{division}/project/TimeTransactions

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/TimeTransactions

/api/v1/{division}/project/TimeTransactions

/api/v1/{division}/project/TimeTransactions

/api/v1/{division}/project/TimeTransactions

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Webhook ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid |  | Primary key |
|  | Account | False |  |  | Edm.Guid |  | Reference to the account |
|  | AccountName | False |  |  | Edm.String |  | Name of account that is linked to the project |
|  | Activity | False |  |  | Edm.Guid |  | Guid ID of activity that is linked to project WBS (work breakdown structure) |
|  | ActivityDescription | False |  |  | Edm.String |  | Name of activity that is linked to project WBS (work breakdown structure) |
|  | Amount | False |  |  | Edm.Double |  | This property is obsolete. Use property 'AmountFC' instead. |
|  | AmountFC | False |  |  | Edm.Double |  | Calculated amount of the transaction based on (Quantity * PriceFC) |
|  | Attachment | False |  |  | Edm.Guid |  | Attachment linked to the transaction (not mandatory) |
|  | Created | False |  |  | Edm.DateTime |  | Date and time the transaction was created |
|  | Creator | False |  |  | Edm.Guid |  | The Guid ID of user that created the transaction |
|  | CreatorFullName | False |  |  | Edm.String |  | The full name of the user that created the record |
|  | Currency | False |  |  | Edm.String |  | Currency of amount FC |
|  | CustomField | False |  |  | Edm.String |  | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Date | False |  |  | Edm.DateTime |  | Date and time the time transaction was done |
|  | Division | False |  |  | Edm.Int32 |  | Division code |
|  | DivisionDescription | False |  |  | Edm.String |  | Description of Division |
|  | Employee | False |  |  | Edm.Guid |  | Guid ID of the employee that is linked to the time transaction |
|  | EndTime | False |  |  | Edm.DateTime |  | End time of the time transaction |
|  | EntryNumber | False |  |  | Edm.Int32 |  | Number that represents the grouping of time transactions |
|  | ErrorText | False |  |  | Edm.String |  | (Only used by backgroundjobs) To determine which transaction has an error |
|  | HourStatus | False |  |  | Edm.Int16 |  | For POST/PUT: Status of the transaction: 1 = Draft, 2 = Rejected, 10 = Submitted  For GET: Status of the transaction: 1 = Draft, 2 = Rejected, 10 = Submitted, 11 = Failed on approval, 14 = Processing, 16 = Processing, 19 = Failed while undoing approval, 20 = Final |
|  | Item | True |  |  | Edm.Guid |  | Item that is linked to the transaction, which provides the time information |
|  | ItemDescription | False |  |  | Edm.String |  | Description of the item that is linked to the transaction |
|  | ItemDivisable | False |  |  | Edm.Boolean |  | Indicates if fractional quantities of the item can be used, for example quantity = 0.4 |
|  | Modified | False |  |  | Edm.DateTime |  | The date and time transaction record was modified |
|  | Modifier | False |  |  | Edm.Guid |  | The Guid ID of the user that modified the records |
|  | ModifierFullName | False |  |  | Edm.String |  | The full name of the user that modified the record |
|  | Notes | False |  |  | Edm.String |  | Notes linked to the transaction for providing additional information (not mandatory) |
|  | Price | False |  |  | Edm.Double |  | This property is obsolete. Use property 'PriceFC' instead. |
|  | PriceFC | False |  |  | Edm.Double |  | For use in AmountFC (Quantiy * Price FC) |
|  | Project | False |  |  | Edm.Guid |  | Guid ID of project that is linked to the transaction |
|  | ProjectAccount | False |  |  | Edm.Guid |  | Project account ID that is linked to the transaction (not mandatory) |
|  | ProjectAccountCode | False |  |  | Edm.String |  | Project account code that is linked to the transaction |
|  | ProjectAccountName | False |  |  | Edm.String |  | Project account name that is linked to the transaction |
|  | ProjectCode | False |  |  | Edm.String |  | Project code that is linked to the transaction |
|  | ProjectDescription | False |  |  | Edm.String |  | Project description that is linked to the transaction |
|  | Quantity | True |  |  | Edm.Double |  | Quantity of the item that is linked to the transaction |
|  | SkipValidation | False |  |  | Edm.Boolean |  | Skip validation |
|  | StartTime | False |  |  | Edm.DateTime |  | Start time of the time transaction |
|  | Subscription | False |  |  | Edm.Guid |  | Guid ID of subscription that is linked to the transaction |
|  | SubscriptionAccount | False |  |  | Edm.Guid |  | Subscription account ID that is linked to the transaction, this is to identify the referenced subscription |
|  | SubscriptionAccountCode | False |  |  | Edm.String |  | Subscription account code that is linked to the transaction |
|  | SubscriptionAccountName | False |  |  | Edm.String |  | Subscription account name that is linked to the transaction |
|  | SubscriptionDescription | False |  |  | Edm.String |  | Subscription description that is linked to the transaction |
|  | SubscriptionNumber | False |  |  | Edm.Int32 |  | Subscription number that is linked to the transaction |
|  | Type | False |  |  | Edm.Int16 |  | The type of transaction. E.g: 1 = Time, 2 = Cost |

## Returns

---

## WBSActivities

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - WBSActivities

## Endpoint

WBSActivities

## Good to know

Use this endpoint to create, read, update and delete Work Breakdown Structure (WBS) activity.

Note: For creating a WBS activity, it is mandatory to supply Project and Description.

## Scope

Projects projects

## URI

/api/v1/{division}/project/WBSActivities

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/WBSActivities

/api/v1/{division}/project/WBSActivities

/api/v1/{division}/project/WBSActivities

/api/v1/{division}/project/WBSActivities

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AutoCreateInvoiceTerm | False |  |  | Edm.Boolean | To indicated auto create invoice term when invoice method is Fixed price |
|  | BlockEntry | False |  |  | Edm.Boolean | To indicated if time and cost entries is blocked |
|  | BudgetedCost | False |  |  | Edm.Double | Budget cost of the WBS activity |
|  | BudgetedHours | False |  |  | Edm.Double | Budget hours of the WBS |
|  | BudgetedRevenue | False |  |  | Edm.Double | Revenue of the WBS activity |
|  | BudgetOverrunHours | False |  |  | Edm.Byte | BudgetOverrunHours: 10-Allowed, 20-Not Allowed |
|  | Completed | False |  |  | Edm.Boolean | To indicated if the WBS activity is completed |
|  | Created | False |  |  | Edm.DateTime | The date and time when the WBS activity was created |
|  | Creator | False |  |  | Edm.Guid | The ID of the user that created the WBS activity |
|  | CreatorFullName | False |  |  | Edm.String | The full name of the user that created the WBS activity |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | DefaultItem | False |  |  | Edm.Guid | Default Item to used for time entry |
|  | DefaultItemIsMandatory | False |  |  | Edm.Boolean | To indicated if only default item is allowed |
|  | Description | True |  |  | Edm.String | Description of the WBS activity |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | End date of the WBS activity |
|  | InvoiceDate | False |  |  | Edm.DateTime | The invoice date of the WBS when auto create invoice term |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. E.g: 2 = Fixed price, 3 = Time and Material, 4 = Non billable, 5 = Prepaid |
|  | InvoiceSeparately | False |  |  | Edm.Boolean | To indicated if additional invoice is allowed on this WBS expense. Additional invoice can only be set when the project type is fixed price or prepaid and the project allow additional invoices. |
|  | InvoiceTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | Modified | False |  |  | Edm.DateTime | The date when the WBS activity was modified |
|  | Modifier | False |  |  | Edm.Guid | The ID of the user that modified the WBS activity |
|  | ModifierFullName | False |  |  | Edm.String | The full name of the user that modified the WBS activity |
|  | Notes | False |  |  | Edm.String | For additional information |
|  | PartOf | False |  |  | Edm.Guid | ID of the WBS activity part of |
|  | PartOfDescription | False |  |  | Edm.String | Description of part of |
|  | Project | True |  |  | Edm.Guid | ID of the project that linked to WBS activity |
|  | ProjectDescription | False |  |  | Edm.String | Project description that is linked to WBS activity |
|  | ProjectTermAction | False |  |  | Edm.Int16 | Project term action |
|  | ReleaseInvoiceTerm | False |  |  | Edm.Boolean | Action to release the invoice term. You can only release a WBS activity's invoice term once and it cannot be undo |
|  | ReleaseInvoiceTermDate | False |  |  | Edm.DateTime | Release invoice term date. The linked invoice term date can be updated by using this property. The update will only happen when releasing a WBS activity's invoice term |
|  | ReleaseInvoiceTermHasSpecifyDate | False |  |  | Edm.Boolean | Release invoice term has specify date |
|  | SequenceNumber | False |  |  | Edm.Int32 | Sequence number of the WBS activity. Last sequence will be selected if not specified |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the WBS activity |
|  | TimeQuantityToAlert | False |  |  | Edm.Double | Alert when exceeding this time quantity |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |
|  | UpdateAction | False |  |  | Edm.Int16 | Update action |

## Returns

---

## WBSDeliverables

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - WBSDeliverables

## Endpoint

WBSDeliverables

## Good to know

Use this endpoint to create, read, update and delete Work Breakdown Structure (WBS) deliverable.

Note: For creating a WBS deliverable, it is mandatory to supply Project and Description.

## Scope

Projects projects

## URI

/api/v1/{division}/project/WBSDeliverables

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/WBSDeliverables

/api/v1/{division}/project/WBSDeliverables

/api/v1/{division}/project/WBSDeliverables

/api/v1/{division}/project/WBSDeliverables

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | Completed | False |  |  | Edm.Boolean | To indicated if the WBS deliverable is completed. WBS deliverable can only be set to completed when an invoice term is linked |
|  | Created | False |  |  | Edm.DateTime | The date and time when the WBS deliverable was created |
|  | Creator | False |  |  | Edm.Guid | The ID of the user that created the WBS deliverable |
|  | CreatorFullName | False |  |  | Edm.String | The full name of the user that created the WBS deliverable |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Description | True |  |  | Edm.String | Description of the WBS deliverable |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | Milestone | False |  |  | Edm.Boolean | To indicated if this is a milestone |
|  | Modified | False |  |  | Edm.DateTime | The date when the WBS deliverable was modified |
|  | Modifier | False |  |  | Edm.Guid | The ID of the user that modified the WBS deliverable |
|  | ModifierFullName | False |  |  | Edm.String | The full name of the user that modified the WBS deliverable |
|  | Notes | False |  |  | Edm.String | For additional information |
|  | PartOf | False |  |  | Edm.Guid | ID of the WBS deliverable part of |
|  | PartOfDescription | False |  |  | Edm.String | Description of part of |
|  | Project | True |  |  | Edm.Guid | ID of the project that linked to WBS deliverable |
|  | ProjectDescription | False |  |  | Edm.String | Project description that is linked to WBS deliverable |
|  | ProjectTerm | False |  |  | Edm.Guid | ID of invoice term that linked to the WBS deliverable. Invoice term can only be linked when the project is using billing milestones and the deliverable is set as a milestone |
|  | ProjectTermDescription | False |  |  | Edm.String | Description of invoice term that linked to the WBS deliverable |
|  | ReleaseInvoiceTerm | False |  |  | Edm.Boolean | Action to release the invoice term. You can only release a WBS deliverable's invoice term once and it cannot be undo |
|  | ReleaseInvoiceTermDate | False |  |  | Edm.DateTime | Release invoice term date. The linked invoice term date can be updated by using this property. The update will only happen when releasing a WBS deliverable's invoice term |
|  | ReleaseInvoiceTermHasSpecifyDate | False |  |  | Edm.Boolean | Release invoice term has specify date |
|  | SequenceNumber | False |  |  | Edm.Int32 | Sequence number of the WBS deliverable. Last sequence will be selected if not specified |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |
|  | UpdateAction | False |  |  | Edm.Int16 | Update action |

## Returns

---

## WBSExpenses

| Even geduld a.u.b... |
| --- |

# Exact Online REST API - WBSExpenses

## Endpoint

WBSExpenses

## Good to know

Use this endpoint to create, read, update and delete Work Breakdown Structure (WBS) expense.

Note: For creating a WBS expense, it is mandatory to supply Project and Description.

## Scope

Projects projects

## URI

/api/v1/{division}/project/WBSExpenses

GET  POST  PUT  DELETE 
## Example usage

/api/v1/{division}/project/WBSExpenses

/api/v1/{division}/project/WBSExpenses

/api/v1/{division}/project/WBSExpenses

/api/v1/{division}/project/WBSExpenses

## Properties

|  | Name ↑↓ | Mandatory ↑↓ | Value | Value | Type ↑↓ | Description ↑↓ |
| --- | --- | --- | --- | --- | --- | --- |
|  | ID | False |  |  | Edm.Guid | Primary key |
|  | AutoCreateInvoiceTerm | False |  |  | Edm.Boolean | To indicated auto create invoice term when invoice method is Fixed |
|  | BlockEntry | False |  |  | Edm.Boolean | To indicated if cost entries is blocked |
|  | BlockRebilling | False |  |  | Edm.Boolean | To indicated if rebilling is blocked |
|  | BudgetedCost | False |  |  | Edm.Double | Budget cost of the WBS expense |
|  | BudgetedRevenue | False |  |  | Edm.Double | Revenue of the WBS expense |
|  | Completed | False |  |  | Edm.Boolean | To indicated if the WBS expense is completed |
|  | Created | False |  |  | Edm.DateTime | The date and time when the WBS expense was created |
|  | Creator | False |  |  | Edm.Guid | The ID of the user that created the WBS expense |
|  | CreatorFullName | False |  |  | Edm.String | The full name of the user that created the WBS expense |
|  | CustomField | False |  |  | Edm.String | Custom field endpoint. Provided only for the Exact Online Premium users. |
|  | Description | True |  |  | Edm.String | Description of the WBS expense |
|  | Division | False |  |  | Edm.Int32 | Division code |
|  | EndDate | False |  |  | Edm.DateTime | End date of the WBS expense |
|  | InvoiceDate | False |  |  | Edm.DateTime | The invoice term date of the WBS when set to fixed billing |
|  | InvoiceMethod | False |  |  | Edm.Int16 | The invoice method of the WBS. E.g: 6 = Fixed, 7 = Rebill, 8 = Non re-billable |
|  | InvoiceSeparately | False |  |  | Edm.Boolean | To indicated if additional invoice is allowed on this WBS expense. Additional invoice can only be set when the project type is fixed price or prepaid and the project allow additional invoices. (Obsolete) |
|  | InvoiceTerm | False |  |  | Edm.Guid | ID of the invoice term that linked to the WBS |
|  | Item | False |  |  | Edm.Guid | Item to used for cost entry |
|  | MarkupPercentage | False |  |  | Edm.Double | Markup percentage |
|  | Modified | False |  |  | Edm.DateTime | The date when the WBS expense was modified |
|  | Modifier | False |  |  | Edm.Guid | The ID of the user that modified the WBS expense |
|  | ModifierFullName | False |  |  | Edm.String | The full name of the user that modified the WBS expense |
|  | Notes | False |  |  | Edm.String | For additional information |
|  | PartOf | False |  |  | Edm.Guid | ID of the WBS expense part of |
|  | PartOfDescription | False |  |  | Edm.String | Description of part of |
|  | Project | True |  |  | Edm.Guid | ID of the project that linked to WBS expense |
|  | ProjectDescription | False |  |  | Edm.String | Project description that is linked to WBS expense |
|  | ProjectTermAction | False |  |  | Edm.Int16 | Project term action |
|  | PurchasePrice | False |  |  | Edm.Double | Purchase price of the item |
|  | Quantity | False |  |  | Edm.Double | Quantity of the WBS |
|  | ReleaseInvoiceTerm | False |  |  | Edm.Boolean | Action to release the invoice term. You can only release a WBS expense's invoice term once and it cannot be undo |
|  | ReleaseInvoiceTermDate | False |  |  | Edm.DateTime | Release invoice term date. The linked invoice term date can be updated by using this property. The update will only happen when releasing a WBS expense's invoice term |
|  | ReleaseInvoiceTermHasSpecifyDate | False |  |  | Edm.Boolean | Release invoice term has specify date |
|  | SequenceNumber | False |  |  | Edm.Int32 | Sequence number of the WBS deliverable. Last sequence will be selected if not specified |
|  | StartDate | False |  |  | Edm.DateTime | Start date of the WBS expense |
|  | Supplier | False |  |  | Edm.Guid | Supplier of the item |
|  | Type | False |  |  | Edm.Int16 | The type of project WBS. E.g: 1 = Deliverable, 2 = Activity, 3 = Expense |
|  | UpdateAction | False |  |  | Edm.Int16 | Update action |

## Returns

---

