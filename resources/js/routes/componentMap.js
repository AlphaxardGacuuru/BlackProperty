// Component imports - centralized component mapping
import Header from "@/components/Layouts/Header"
import Index from "@/pages/index"

import AdminNav from "@/components/Layouts/AdminNav"

import AdminSubscriptionPlan from "@/components/Auth/SubscriptionPlan"

import AdminDashboard from "@/pages/admin/index"

import AdminProperties from "@/pages/admin/properties/index"
import AdminPropertyCreate from "@/pages/admin/properties/create"
import AdminPropertyShow from "@/pages/admin/properties/[id]"
import AdminPropertyEdit from "@/pages/admin/properties/edit/[id]"

import AdminUnits from "@/pages/admin/units/index"
import AdminUnitCreate from "@/pages/admin/units/create"
import AdminUnitShow from "@/pages/admin/units/[id]"
import AdminUnitEdit from "@/pages/admin/units/edit/[id]"

import AdminUnitTenantCreate from "@/pages/admin/units/tenants/create"
import AdminUnitWaterReadingCreate from "@/pages/admin/units/water-readings/create"
import AdminUnitInvoiceCreate from "@/pages/admin/units/invoices/create"
import AdminUnitPaymentCreate from "@/pages/admin/units/payments/create"
import AdminUnitCreditNoteCreate from "@/pages/admin/units/credit-notes/create"
import AdminUnitDeductionCreate from "@/pages/admin/units/deductions/create"

import AdminTenants from "@/pages/admin/tenants/index"
import AdminTenantCreate from "@/pages/admin/tenants/create"
import AdminTenantShow from "@/pages/admin/tenants/[id]"
import AdminTenantEdit from "@/pages/admin/tenants/edit/[id]"

import AdminInvoices from "@/pages/admin/invoices/index"
import AdminInvoiceCreate from "@/pages/admin/invoices/create"
import AdminInvoiceShow from "@/pages/admin/invoices/[id]"
import AdminInvoiceEdit from "@/pages/admin/invoices/edit/[id]"

import AdminWaterReadings from "@/pages/admin/water-readings/index"
import AdminWaterReadingCreate from "@/pages/admin/water-readings/create"
import AdminWaterReadingEdit from "@/pages/admin/water-readings/edit/[id]"

import AdminPayments from "@/pages/admin/payments/index"
import AdminPaymentCreate from "@/pages/admin/payments/create"
import AdminPaymentShow from "@/pages/admin/payments/[id]"
import AdminPaymentEdit from "@/pages/admin/payments/edit/[id]"

import AdminCreditNotes from "@/pages/admin/credit-notes/index"
import AdminCreditNoteCreate from "@/pages/admin/credit-notes/create"
import AdminCreditNoteEdit from "@/pages/admin/credit-notes/edit/[id]"

import AdminDeductions from "@/pages/admin/deductions/index"
import AdminDeductionCreate from "@/pages/admin/deductions/create"
import AdminDeductionEdit from "@/pages/admin/deductions/edit/[id]"

import AdminEmails from "@/pages/admin/emails/index"
import AdminSMSMessages from "@/pages/admin/smses/index"

import AdminBilling from "@/pages/admin/billing/index"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/edit/[id]"

import AdminRoleIndex from "@/pages/admin/role"
import AdminRoleCreate from "@/pages/admin/role/create"
import AdminRoleEdit from "@/pages/admin/role/edit/[id]"

import AdminSupport from "@/pages/admin/support"

import Socialite from "@/components/Auth/Socialite"
import VerifyEmail from "@/components/Auth/VerifyEmail"

// Component mapping object
const componentMap = {
	// Layout components
	Header,
	AdminNav,

	// Public components
	Index,

	// Auth components
	Socialite,
	VerifyEmail,

	// Admin components
	AdminSubscriptionPlan,
	AdminDashboard,

	// Property components
	AdminProperties,
	AdminPropertyCreate,
	AdminPropertyShow,
	AdminPropertyEdit,

	// Unit components
	AdminUnits,
	AdminUnitCreate,
	AdminUnitShow,
	AdminUnitEdit,
	AdminUnitTenantCreate,
	AdminUnitWaterReadingCreate,
	AdminUnitInvoiceCreate,
	AdminUnitPaymentCreate,
	AdminUnitCreditNoteCreate,
	AdminUnitDeductionCreate,

	// Tenant components
	AdminTenants,
	AdminTenantCreate,
	AdminTenantShow,
	AdminTenantEdit,

	// Financial components
	AdminInvoices,
	AdminInvoiceCreate,
	AdminInvoiceShow,
	AdminInvoiceEdit,
	AdminPayments,
	AdminPaymentCreate,
	AdminPaymentShow,
	AdminPaymentEdit,
	AdminCreditNotes,
	AdminCreditNoteCreate,
	AdminCreditNoteEdit,
	AdminDeductions,
	AdminDeductionCreate,
	AdminDeductionEdit,
	AdminBilling,

	// Water readings
	AdminWaterReadings,
	AdminWaterReadingCreate,
	AdminWaterReadingEdit,

	// Communication
	AdminEmails,
	AdminSMSMessages,

	// Staff and roles
	AdminStaff,
	AdminStaffCreate,
	AdminStaffEdit,
	AdminRoleIndex,
	AdminRoleCreate,
	AdminRoleEdit,

	// Support
	AdminSupport,
}

export default componentMap
