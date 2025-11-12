// Component imports - centralized component mapping
import Header from "@/components/Layouts/Header"
import Index from "@/pages/index"
import DownloadApp from "@/pages/download-app"

import AdminNav from "@/components/Layouts/AdminNav"

import Socialite from "@/pages/auth/socialite"
import VerifyEmail from "@/pages/auth/verify-email"
import ForgotPassword from "@/pages/auth/forgot-password"
import ResetPassword from "@/pages/auth/reset-password"
import AdminSubscriptionPlan from "@/pages/auth/subscription-plan"

import SuperStaff from "@/pages/super/staff/index"
import SuperStaffCreate from "@/pages/super/staff/create"
import SuperStaffEdit from "@/pages/super/staff/edit/[id]"

import SuperReferral from "@/pages/super/referrals/index"

import SuperSubscriptionPlans from "@/pages/super/subscription-plans/index"
import SuperSubscriptionPlanCreate from "@/pages/super/subscription-plans/create"
import SuperSubscriptionPlanEdit from "@/pages/super/subscription-plans/edit/[id]"

import SuperUserSubscriptionPlans from "@/pages/super/user-subscription-plans/index"
import SuperUserSubscriptionPlanCreate from "@/pages/super/user-subscription-plans/create"
import SuperUserSubscriptionPlanEdit from "@/pages/super/user-subscription-plans/edit/[id]"

import AdminUserEdit from "@/pages/admin/users/edit/[id]"
import AdminDashboard from "@/pages/admin/index"

import AdminProperties from "@/pages/admin/properties/index"
import AdminPropertyShow from "@/pages/admin/properties/[id]"
import AdminPropertyCreate from "@/pages/admin/properties/create"
import AdminPropertyEdit from "@/pages/admin/properties/edit/[id]"

import AdminUnits from "@/pages/admin/units/index"
import AdminUnitShow from "@/pages/admin/units/[id]"
import AdminUnitCreate from "@/pages/admin/units/create"
import AdminUnitEdit from "@/pages/admin/units/edit/[id]"

import AdminUnitTenantCreate from "@/pages/admin/units/tenants/create"
import AdminUnitWaterReadingCreate from "@/pages/admin/units/water-readings/create"
import AdminUnitInvoiceCreate from "@/pages/admin/units/invoices/create"
import AdminUnitPaymentCreate from "@/pages/admin/units/payments/create"
import AdminUnitCreditNoteCreate from "@/pages/admin/units/credit-notes/create"
import AdminUnitDeductionCreate from "@/pages/admin/units/deductions/create"

import AdminTenants from "@/pages/admin/tenants/index"
import AdminTenantShow from "@/pages/admin/tenants/[id]"
import AdminTenantCreate from "@/pages/admin/tenants/create"
import AdminTenantEdit from "@/pages/admin/tenants/edit/[id]"

import AdminInvoices from "@/pages/admin/invoices/index"
import AdminInvoiceShow from "@/pages/admin/invoices/[id]"
import AdminInvoiceCreate from "@/pages/admin/invoices/create"
import AdminInvoiceEdit from "@/pages/admin/invoices/edit/[id]"

import AdminWaterReadings from "@/pages/admin/water-readings/index"
import AdminWaterReadingCreate from "@/pages/admin/water-readings/create"
import AdminWaterReadingEdit from "@/pages/admin/water-readings/edit/[id]"

import AdminPayments from "@/pages/admin/payments/index"
import AdminPaymentShow from "@/pages/admin/payments/[id]"
import AdminPaymentCreate from "@/pages/admin/payments/create"
import AdminPaymentEdit from "@/pages/admin/payments/edit/[id]"

import AdminCreditNotes from "@/pages/admin/credit-notes/index"
import AdminCreditNoteShow from "@/pages/admin/credit-notes/[id]"
import AdminCreditNoteCreate from "@/pages/admin/credit-notes/create"
import AdminCreditNoteEdit from "@/pages/admin/credit-notes/edit/[id]"

import AdminDeductions from "@/pages/admin/deductions/index"
import AdminDeductionShow from "@/pages/admin/deductions/[id]"
import AdminDeductionCreate from "@/pages/admin/deductions/create"
import AdminDeductionEdit from "@/pages/admin/deductions/edit/[id]"

import AdminEmails from "@/pages/admin/emails/index"
import AdminSMSMessages from "@/pages/admin/smses/index"
import AdminAnnouncements from "@/pages/admin/announcements/index"
import AdminAnnouncementCreate from "@/pages/admin/announcements/create"

import AdminBilling from "@/pages/admin/billing/index"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/edit/[id]"

import AdminRoleIndex from "@/pages/admin/role"
import AdminRoleCreate from "@/pages/admin/role/create"
import AdminRoleEdit from "@/pages/admin/role/edit/[id]"

import AdminVisitorAdmissions from "@/pages/admin/visitor-admissions"
import AdminVisitorAdmissionShow from "@/pages/admin/visitor-admissions/[id]"
import AdminVisitorAdmissionCreate from "@/pages/admin/visitor-admissions/create"
import AdminVisitorAdmissionEdit from "@/pages/admin/visitor-admissions/edit/[id]"

import AdminSupport from "@/pages/admin/support"

import TenantVacantUnits from "@/pages/tenant/vacant-units/index"

// Component mapping object
const componentMap = {
	// Layout components
	Header,
	AdminNav,

	// Public components
	Index,
	DownloadApp,

	// Auth components
	Socialite,
	VerifyEmail,
	ForgotPassword,
	ResetPassword,

	SuperStaff,
	SuperStaffCreate,
	SuperStaffEdit,

	SuperReferral,

	SuperSubscriptionPlans,
	SuperSubscriptionPlanCreate,
	SuperSubscriptionPlanEdit,

	SuperUserSubscriptionPlans,
	SuperUserSubscriptionPlanCreate,
	SuperUserSubscriptionPlanEdit,

	// Admin components
	AdminUserEdit,
	AdminSubscriptionPlan,
	AdminDashboard,

	// Property components
	AdminProperties,
	AdminPropertyShow,
	AdminPropertyCreate,
	AdminPropertyEdit,

	// Unit components
	AdminUnits,
	AdminUnitShow,
	AdminUnitCreate,
	AdminUnitEdit,
	AdminUnitTenantCreate,
	AdminUnitWaterReadingCreate,
	AdminUnitInvoiceCreate,
	AdminUnitPaymentCreate,
	AdminUnitCreditNoteCreate,
	AdminUnitDeductionCreate,

	// Tenant components
	AdminTenants,
	AdminTenantShow,
	AdminTenantCreate,
	AdminTenantEdit,

	// Financial components
	AdminInvoices,
	AdminInvoiceShow,
	AdminInvoiceCreate,
	AdminInvoiceEdit,
	AdminPayments,
	AdminPaymentShow,
	AdminPaymentCreate,
	AdminPaymentEdit,
	AdminCreditNotes,
	AdminCreditNoteShow,
	AdminCreditNoteCreate,
	AdminCreditNoteEdit,
	AdminDeductions,
	AdminDeductionShow,
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
	AdminAnnouncements,
	AdminAnnouncementCreate,

	// Staff and roles
	AdminStaff,
	AdminStaffCreate,
	AdminStaffEdit,
	AdminRoleIndex,
	AdminRoleCreate,
	AdminRoleEdit,

	AdminVisitorAdmissions,
	AdminVisitorAdmissionShow,
	AdminVisitorAdmissionCreate,
	AdminVisitorAdmissionEdit,

	AdminSupport,

	TenantVacantUnits,
}

export default componentMap
