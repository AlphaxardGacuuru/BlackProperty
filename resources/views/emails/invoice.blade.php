<x-mail::message>
	
Dear {{ $invoice->tenantName }},
	
Here is the summary of your invoice:

---

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
<img 
	src="{{ asset('/storage/img/vector/default-monochrome.svg') }}" 
	alt="Invoice Logo" 
	style="width: 150px; height: auto; margin-top: 20px;">

<h1 style="font-size: 2em; padding: 10px;">INVOICE</h1>
</div>

<div style="display: flex; justify-content: space-between;">
<div>
	<b>Billed To</b>
	<div>Tenant: {{ $invoice->tenantName }}</div>
	<div>Unit: {{ $invoice->unitName }}</div>
	<div>Phone: {{ $invoice->tenantPhone }}</div>
	<div>Email: {{ $invoice->tenantEmail }}</div>
</div>
<div style="text-align: end;">
	<b>Invoice No: {{ $invoice->code }}</b>
	<div>Date: {{ $invoice->createdAt }}</div>
</div>
</div>

<table style="width: 100%; margin: 40px 0;">
	<thead>
		<tr>
			<th>Type</th>
			<th>{{ $invoice->type == "water" ? "Reading" : "" }}</th>
			<th>{{ $invoice->type == "water" ? "Usage" : "" }}</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="text-align: center;">{{ ucfirst($invoice->type) }}</td>
			<td style="text-align: center;">{{ $invoice->type == "water" ? $invoice->waterReading : "" }}</td>
			<td style="text-align: center;">{{ $invoice->type == "water" ? $invoice->waterUsage : "" }}</td>
			<td style="text-align: center;">KES {{ $invoice->balance }}</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td style="text-align: center;"><b>Total</b></td>
			<td style="text-align: center;"><b>KES {{ $invoice->balance }}</b></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td style="text-align: center;"><b>Paid</b></td>
			<td style="text-align: center;"><b>KES {{ $invoice->paid }}</b></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td style="text-align: center;"><b>Balance</b></td>
			<td style="text-align: center;"><b>KES {{ $invoice->balance }}</b></td>
		</tr>
	</tbody>
</table>

<center>Thank you for your tenancy!</center>

<div style="display: flex; justify-content: flex-end;">
<div style="text-align: end;">
<img 
	src="{{ asset('/storage/img/vector/default-monochrome.svg') }}" 
	alt="Invoice Logo" 
	style="width: 8em; height: auto; margin: 0px 0;">

<b>Email</b>: al@black.co.ke  
<b>Phone</b>: +254700364446
</div>
</div>

---

<x-mail::button url="https://tenant.property.black.co.ke/invoices">
View Full Invoice
</x-mail::button>

Thanks,  
{{ config('app.name') }}
</x-mail::message>