<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#FFF" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#232323">
    <meta name="description" content="The best Property Management App" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Black Property') }}</title>
    <link rel="icon" href="storage/img/favicon.ico">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">
    <link rel="manifest" type="application/manifest+json" href="manifest.webmanifest">

    <style>
        body {
            overflow-x: hidden;
            font-family: 'Nunito', sans-serif;
            background-color: #f8f9fa;
            color: #212529;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        }

        .my-5 {
            margin-top: 3rem !important;
            margin-bottom: 3rem !important;
        }

        .offset-xl-2 {
            width: 90%;
            margin: auto;
        }

        .card {
            background-color: #fff;
            border: 1px solid #dee2e6;
            border-radius: 0.25rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            padding: 1rem;
            border-bottom: 1px solid #dee2e6;
        }

        .bg-white {
            background-color: #fff !important;
        }

        .border-0 {
            border: 0 !important;
        }

        .d-flex {
            display: flex !important;
        }

        .justify-content-between {
            justify-content: space-between !important;
        }

        .text-dark {
            color: #343a40 !important;
        }

        .mb-1 {
            margin-bottom: 0.25rem !important;
        }

        .mb-4 {
            margin-bottom: 1rem !important;
        }

        .mb-0 {
            margin-bottom: 0 !important;
        }

        .text-center {
            text-align: center !important;
        }

        .text-capitalize {
            text-transform: capitalize !important;
        }

        .py-2 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
        }

        .px-4 {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
        }

        .bg-danger-subtle {
            background-color: #f8d7da !important;
            color: #842029 !important;
        }

        .bg-warning-subtle {
            background-color: #fff3cd !important;
            color: #856404 !important;
        }

        .bg-success-subtle {
            background-color: #d1e7dd !important;
            color: #0f5132 !important;
        }

        .bg-dark-subtle {
            background-color: #d6d8d9 !important;
            color: #1b1e21 !important;
        }

        .card-body {
            padding: 1.5rem;
        }

        .text-muted {
            color: #6c757d !important;
        }

        .text-end {
            text-align: right !important;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
        }

        .table-borderless th,
        .table-borderless td {
            border: 0;
        }

        .border-bottom {
            border-bottom: 1px solid #232323 !important;
        }

        .border-top {
            border-top: 1px solid #dee2e6 !important;
        }

        .fw-normal {
            font-weight: 400 !important;
        }

        .me-1 {
            margin-right: 0.25rem !important;
        }

        .text-center {
            text-align: center !important;
        }

        .card-footer {
            padding: 1rem;
            border-top: 1px solid #dee2e6;
        }
    </style>
</head>

<body>
    @php
        $months = [
            'Select Month',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    @endphp

    <div class="row my-5">
        <div class="offset-xl-2">
            <div class="card p-5">
                <div class="card-header bg-white border-0 d-flex justify-content-between">
                    <div class="text-dark mb-1" style="font-size: 3em;">
                        {{-- Logo Start --}}
                        <svg data-v-423bf9ae="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432.6315789473684 163"
                            className="iconAbove" width="4em" height="auto">
                            <g data-v-423bf9ae="" id="bcba994c-cb7e-427a-8bd8-6b5638ce1913" fill="currentColor"
                                transform="matrix(4.2105263157894735,0,0,4.2105263157894735,-5.89473949608049,97.10526170856075)">
                                <path
                                    d="M5.25 1.40Q6.02 1.40 6.68 1.74Q7.34 2.09 7.72 2.69Q8.11 3.29 8.11 4.05L8.11 4.05Q8.11 4.83 7.69 5.45Q7.27 6.08 6.57 6.38L6.57 6.38Q7.55 6.65 8.11 7.37Q8.68 8.09 8.68 9.16L8.68 9.16Q8.68 10.08 8.27 10.80Q7.85 11.52 7.12 11.93Q6.38 12.33 5.46 12.33L5.46 12.33L1.95 12.33Q1.69 12.33 1.55 12.23Q1.40 12.12 1.40 11.91L1.40 11.91L1.40 1.82Q1.40 1.62 1.52 1.51Q1.64 1.40 1.82 1.40L1.82 1.40L5.25 1.40ZM5.25 6.02Q6.15 6.02 6.71 5.47Q7.27 4.93 7.27 4.05L7.27 4.05Q7.27 3.19 6.71 2.72Q6.16 2.24 5.25 2.24L5.25 2.24L2.24 2.24L2.24 6.02L5.25 6.02ZM5.46 11.49Q6.15 11.49 6.69 11.19Q7.22 10.89 7.53 10.36Q7.84 9.83 7.84 9.16L7.84 9.16Q7.84 8.50 7.53 7.97Q7.22 7.45 6.69 7.15Q6.15 6.86 5.46 6.86L5.46 6.86L2.24 6.86L2.24 11.49L5.46 11.49ZM10.43 1.82Q10.43 1.62 10.55 1.51Q10.67 1.40 10.85 1.40L10.85 1.40Q11.05 1.40 11.16 1.51Q11.27 1.62 11.27 1.82L11.27 1.82L11.27 10.02Q11.27 10.67 11.54 11.08Q11.82 11.49 12.25 11.49L12.25 11.49L12.60 11.49Q12.75 11.49 12.85 11.61Q12.95 11.72 12.95 11.91L12.95 11.91Q12.95 12.10 12.84 12.21Q12.73 12.33 12.53 12.33L12.53 12.33L12.25 12.33Q11.45 12.33 10.94 11.69Q10.43 11.05 10.43 10.02L10.43 10.02L10.43 1.82ZM17.57 4.59Q18.66 4.59 19.56 5.10Q20.45 5.61 20.96 6.51Q21.48 7.41 21.48 8.51L21.48 8.51L21.48 11.91Q21.48 12.10 21.36 12.21Q21.25 12.33 21.06 12.33L21.06 12.33Q20.87 12.33 20.76 12.21Q20.64 12.10 20.64 11.91L20.64 11.91L20.64 10.82Q20.17 11.56 19.37 11.99Q18.56 12.42 17.57 12.42L17.57 12.42Q16.46 12.42 15.57 11.91Q14.67 11.40 14.16 10.50Q13.65 9.60 13.65 8.51L13.65 8.51Q13.65 7.41 14.16 6.51Q14.67 5.61 15.57 5.10Q16.46 4.59 17.57 4.59L17.57 4.59ZM17.57 11.63Q18.44 11.63 19.14 11.23Q19.84 10.82 20.24 10.11Q20.64 9.39 20.64 8.51L20.64 8.51Q20.64 7.63 20.24 6.92Q19.84 6.20 19.14 5.79Q18.44 5.38 17.57 5.38L17.57 5.38Q16.70 5.38 16.00 5.79Q15.30 6.20 14.90 6.92Q14.49 7.63 14.49 8.51L14.49 8.51Q14.49 9.39 14.90 10.11Q15.30 10.82 16.00 11.23Q16.70 11.63 17.57 11.63L17.57 11.63ZM26.75 4.61Q27.65 4.61 28.39 4.96Q29.13 5.31 29.68 5.99L29.68 5.99Q29.78 6.13 29.78 6.23L29.78 6.23Q29.78 6.43 29.58 6.54L29.58 6.54Q29.48 6.62 29.36 6.62L29.36 6.62Q29.16 6.62 29.04 6.45L29.04 6.45Q28.14 5.39 26.75 5.39L26.75 5.39Q25.94 5.39 25.31 5.79Q24.68 6.19 24.34 6.90Q24.00 7.62 24.00 8.51L24.00 8.51Q24.00 9.39 24.37 10.11Q24.75 10.82 25.42 11.23Q26.10 11.63 26.96 11.63L26.96 11.63Q28.20 11.63 28.94 10.95L28.94 10.95Q29.06 10.82 29.23 10.82L29.23 10.82Q29.39 10.82 29.48 10.92L29.48 10.92Q29.62 11.05 29.62 11.23L29.62 11.23Q29.62 11.38 29.51 11.48L29.51 11.48Q29.02 11.93 28.36 12.17Q27.71 12.42 26.96 12.42L26.96 12.42Q25.89 12.42 25.02 11.91Q24.15 11.40 23.65 10.50Q23.16 9.60 23.16 8.51L23.16 8.51Q23.16 7.41 23.62 6.52Q24.08 5.63 24.91 5.12Q25.73 4.61 26.75 4.61L26.75 4.61ZM37.66 11.72Q37.76 11.83 37.76 11.97L37.76 11.97Q37.76 12.12 37.60 12.26L37.60 12.26Q37.46 12.38 37.35 12.38L37.35 12.38Q37.18 12.38 37.06 12.21L37.06 12.21L34.02 8.50L32.72 9.69L32.72 11.91Q32.72 12.10 32.61 12.21Q32.49 12.33 32.30 12.33L32.30 12.33Q32.12 12.33 32.00 12.21Q31.88 12.10 31.88 11.91L31.88 11.91L31.88 1.82Q31.88 1.62 32.00 1.51Q32.12 1.40 32.30 1.40L32.30 1.40Q32.49 1.40 32.61 1.51Q32.72 1.62 32.72 1.82L32.72 1.82L32.72 8.67L37.06 4.72Q37.20 4.61 37.32 4.61L37.32 4.61Q37.46 4.61 37.59 4.75L37.59 4.75Q37.72 4.87 37.72 5.01L37.72 5.01Q37.72 5.15 37.58 5.28L37.58 5.28L34.61 7.98L37.66 11.72ZM45.00 11.91Q45.00 12.10 44.88 12.21Q44.77 12.33 44.58 12.33L44.58 12.33Q44.39 12.33 44.27 12.21Q44.16 12.10 44.16 11.91L44.16 11.91L44.16 1.82Q44.16 1.62 44.27 1.51Q44.39 1.40 44.58 1.40L44.58 1.40L47.38 1.40Q48.38 1.40 49.18 1.85Q49.98 2.30 50.43 3.09Q50.88 3.89 50.88 4.90L50.88 4.90Q50.88 5.92 50.43 6.72Q49.98 7.52 49.18 7.97Q48.38 8.41 47.38 8.41L47.38 8.41L45.00 8.41L45.00 11.91ZM47.38 7.57Q48.15 7.57 48.75 7.23Q49.35 6.89 49.69 6.28Q50.04 5.67 50.04 4.90L50.04 4.90Q50.04 4.13 49.69 3.53Q49.35 2.93 48.75 2.58Q48.15 2.24 47.38 2.24L47.38 2.24L45.00 2.24L45.00 7.57L47.38 7.57ZM55.73 4.59Q56.80 4.59 56.80 5.05L56.80 5.05Q56.80 5.12 56.78 5.17L56.78 5.17Q56.74 5.32 56.65 5.38Q56.56 5.45 56.41 5.45L56.41 5.45Q56.28 5.45 56.08 5.42Q55.87 5.39 55.73 5.39L55.73 5.39Q55.03 5.39 54.49 5.68Q53.94 5.98 53.63 6.50Q53.33 7.01 53.33 7.66L53.33 7.66L53.33 11.91Q53.33 12.10 53.21 12.21Q53.10 12.33 52.91 12.33L52.91 12.33Q52.72 12.33 52.60 12.21Q52.49 12.10 52.49 11.91L52.49 11.91L52.49 5.10Q52.49 4.90 52.60 4.79Q52.72 4.68 52.91 4.68L52.91 4.68Q53.10 4.68 53.21 4.79Q53.33 4.90 53.33 5.10L53.33 5.10L53.33 5.96Q53.73 5.32 54.36 4.96Q54.99 4.59 55.73 4.59L55.73 4.59ZM61.56 4.59Q62.65 4.59 63.55 5.10Q64.44 5.61 64.95 6.51Q65.46 7.41 65.46 8.51L65.46 8.51Q65.46 9.60 64.95 10.50Q64.44 11.40 63.55 11.91Q62.65 12.42 61.56 12.42L61.56 12.42Q60.45 12.42 59.56 11.91Q58.66 11.40 58.15 10.50Q57.64 9.60 57.64 8.51L57.64 8.51Q57.64 7.41 58.15 6.51Q58.66 5.61 59.56 5.10Q60.45 4.59 61.56 4.59L61.56 4.59ZM61.56 5.38Q60.69 5.38 59.99 5.79Q59.29 6.20 58.88 6.92Q58.48 7.63 58.48 8.51L58.48 8.51Q58.48 9.39 58.88 10.11Q59.29 10.82 59.99 11.23Q60.69 11.63 61.56 11.63L61.56 11.63Q62.43 11.63 63.13 11.23Q63.83 10.82 64.22 10.11Q64.62 9.39 64.62 8.51L64.62 8.51Q64.62 7.63 64.22 6.92Q63.83 6.20 63.13 5.79Q62.43 5.38 61.56 5.38L61.56 5.38ZM71.47 4.59Q72.58 4.59 73.47 5.10Q74.37 5.61 74.88 6.51Q75.39 7.41 75.39 8.51L75.39 8.51Q75.39 9.60 74.88 10.50Q74.37 11.40 73.47 11.91Q72.58 12.42 71.47 12.42L71.47 12.42Q70.48 12.42 69.67 11.99Q68.87 11.56 68.40 10.82L68.40 10.82L68.40 15.19Q68.40 15.39 68.29 15.50Q68.18 15.61 67.98 15.61L67.98 15.61Q67.80 15.61 67.68 15.50Q67.56 15.39 67.56 15.19L67.56 15.19L67.56 8.46L67.56 8.43Q67.58 7.35 68.10 6.47Q68.61 5.59 69.50 5.09Q70.39 4.59 71.47 4.59L71.47 4.59ZM71.47 11.63Q72.34 11.63 73.04 11.23Q73.74 10.82 74.14 10.11Q74.55 9.39 74.55 8.51L74.55 8.51Q74.55 7.63 74.14 6.92Q73.74 6.20 73.04 5.79Q72.34 5.38 71.47 5.38L71.47 5.38Q70.60 5.38 69.90 5.79Q69.20 6.20 68.80 6.92Q68.40 7.63 68.40 8.51L68.40 8.51Q68.40 9.39 68.80 10.11Q69.20 10.82 69.90 11.23Q70.60 11.63 71.47 11.63L71.47 11.63ZM80.67 4.61Q81.69 4.61 82.50 5.09Q83.30 5.57 83.75 6.43Q84.20 7.28 84.20 8.37L84.20 8.37Q84.20 8.55 84.08 8.66Q83.97 8.76 83.79 8.76L83.79 8.76L77.92 8.76Q77.97 9.59 78.36 10.24Q78.75 10.89 79.41 11.26Q80.07 11.62 80.88 11.62L80.88 11.62Q81.42 11.62 81.98 11.43Q82.53 11.24 82.85 10.93L82.85 10.93Q82.99 10.82 83.15 10.82L83.15 10.82Q83.30 10.82 83.40 10.91L83.40 10.91Q83.55 11.03 83.55 11.20L83.55 11.20Q83.55 11.34 83.43 11.47L83.43 11.47Q82.98 11.87 82.26 12.14Q81.54 12.40 80.88 12.40L80.88 12.40Q79.77 12.40 78.91 11.91Q78.05 11.41 77.56 10.52Q77.07 9.63 77.07 8.51L77.07 8.51Q77.07 7.38 77.53 6.49Q77.98 5.60 78.80 5.10Q79.62 4.61 80.67 4.61L80.67 4.61ZM80.67 5.39Q79.58 5.39 78.83 6.12Q78.08 6.85 77.94 8.04L77.94 8.04L83.38 8.04Q83.29 6.85 82.54 6.12Q81.80 5.39 80.67 5.39L80.67 5.39ZM89.26 4.59Q90.33 4.59 90.33 5.05L90.33 5.05Q90.33 5.12 90.31 5.17L90.31 5.17Q90.27 5.32 90.18 5.38Q90.09 5.45 89.94 5.45L89.94 5.45Q89.81 5.45 89.61 5.42Q89.40 5.39 89.26 5.39L89.26 5.39Q88.56 5.39 88.02 5.68Q87.47 5.98 87.16 6.50Q86.86 7.01 86.86 7.66L86.86 7.66L86.86 11.91Q86.86 12.10 86.74 12.21Q86.63 12.33 86.44 12.33L86.44 12.33Q86.25 12.33 86.14 12.21Q86.02 12.10 86.02 11.91L86.02 11.91L86.02 5.10Q86.02 4.90 86.14 4.79Q86.25 4.68 86.44 4.68L86.44 4.68Q86.63 4.68 86.74 4.79Q86.86 4.90 86.86 5.10L86.86 5.10L86.86 5.96Q87.26 5.32 87.89 4.96Q88.52 4.59 89.26 4.59L89.26 4.59ZM95.61 11.48Q95.80 11.48 95.92 11.60Q96.04 11.72 96.04 11.91L96.04 11.91Q96.04 12.10 95.92 12.21Q95.80 12.33 95.61 12.33L95.61 12.33L95.28 12.33Q94.51 12.33 93.91 11.98Q93.31 11.63 92.97 11.03Q92.64 10.42 92.64 9.65L92.64 9.65L92.64 5.71L91.55 5.71Q91.38 5.71 91.27 5.61Q91.17 5.50 91.17 5.33L91.17 5.33Q91.17 5.17 91.27 5.06Q91.38 4.96 91.55 4.96L91.55 4.96L92.64 4.96L92.64 2.67Q92.64 2.48 92.76 2.36Q92.88 2.24 93.06 2.24L93.06 2.24Q93.25 2.24 93.37 2.36Q93.49 2.48 93.49 2.67L93.49 2.67L93.49 4.96L95.34 4.96Q95.51 4.96 95.61 5.06Q95.72 5.17 95.72 5.33L95.72 5.33Q95.72 5.50 95.61 5.61Q95.51 5.71 95.34 5.71L95.34 5.71L93.49 5.71L93.49 9.65Q93.49 10.46 94.00 10.97Q94.50 11.48 95.30 11.48L95.30 11.48L95.61 11.48ZM103.88 4.69Q104.15 4.80 104.15 5.01L104.15 5.01Q104.15 5.07 104.09 5.21L104.09 5.21L99.39 15.40Q99.26 15.65 99.06 15.65L99.06 15.65Q98.98 15.65 98.87 15.61L98.87 15.61Q98.60 15.50 98.60 15.29L98.60 15.29Q98.60 15.23 98.66 15.09L98.66 15.09L100.06 12.07Q100.04 12.05 100.00 11.97L100.00 11.97L96.94 5.25Q96.88 5.14 96.88 5.03L96.88 5.03Q96.88 4.82 97.12 4.70L97.12 4.70Q97.23 4.65 97.34 4.65L97.34 4.65Q97.55 4.65 97.66 4.89L97.66 4.89L100.51 11.10L103.36 4.90Q103.49 4.65 103.68 4.65L103.68 4.65Q103.78 4.65 103.88 4.69L103.88 4.69Z">
                                </path>
                            </g>
                            <g data-v-423bf9ae="" id="5d959492-747d-41aa-bd9a-6be1a19d88f5"
                                transform="matrix(1.6070882295181732,0,0,1.6070882295181732,168.79145388692194,-3.214890032723787)"
                                stroke="none" fill="currentColor">
                                <path
                                    d="M2.11 27.6a26.252 26.252 0 000 4.784.7.7 0 00.443.567L5.926 34.3a1 1 0 01.607.72 23.819 23.819 0 003.324 8.016 1 1 0 01.081.937L8.51 47.321a.658.658 0 00.073.7 27.854 27.854 0 003.386 3.388.666.666 0 00.708.086l3.349-1.429a.994.994 0 01.937.081 23.819 23.819 0 008.016 3.324 1 1 0 01.72.607l1.35 3.378a.7.7 0 00.555.439 26.5 26.5 0 004.782 0 .7.7 0 00.567-.444l1.347-3.377a1 1 0 01.72-.607 23.819 23.819 0 008.016-3.324 1 1 0 01.937-.081l3.347 1.428a.651.651 0 00.7-.073 27.765 27.765 0 003.38-3.386.66.66 0 00.087-.708l-1.429-3.349a1 1 0 01.081-.937 23.819 23.819 0 003.324-8.016 1 1 0 01.607-.72l3.378-1.35a.7.7 0 00.439-.555 26.5 26.5 0 000-4.782V27.6a.7.7 0 00-.443-.557l-3.37-1.343a1 1 0 01-.607-.721 23.8 23.8 0 00-3.324-8.016 1 1 0 01-.081-.937l1.428-3.347a.66.66 0 00-.074-.7A27.764 27.764 0 0048.031 8.6a.666.666 0 00-.709-.086l-3.348 1.424a1 1 0 01-.937-.081 23.8 23.8 0 00-8.016-3.324 1 1 0 01-.72-.607l-1.35-3.378a.7.7 0 00-.551-.438 26.321 26.321 0 00-4.782 0 .7.7 0 00-.567.443L25.7 5.926a1 1 0 01-.72.607 23.8 23.8 0 00-8.016 3.324 1 1 0 01-.937.081L12.679 8.51a.662.662 0 00-.7.073A28.056 28.056 0 008.6 11.969a.664.664 0 00-.086.708l1.429 3.349a1 1 0 01-.081.937 23.8 23.8 0 00-3.324 8.016 1 1 0 01-.607.721l-3.383 1.349a.7.7 0 00-.438.551zM30 9A21 21 0 119 30 21.024 21.024 0 0130 9z">
                                </path>
                                <path
                                    d="M45 24.806l-14.425-9.637a1.057 1.057 0 00-1.153 0L15 24.781l1.128 1.726 13.313-8.861a1.006 1.006 0 011.11 0l13.291 8.862zM27 31a1 1 0 00-1 1v11h8V32a1 1 0 00-1-1z">
                                </path>
                                <path
                                    d="M39 43a2 2 0 002-2V27.014L30 19.68l-11 7.334V41a2 2 0 002 2h3V32a3 3 0 013-3h6a3 3 0 013 3v11z">
                                </path>
                            </g>
                        </svg>
                        {{-- Logo End --}}
                    </div>
                    <div>
                        <h2 class="text-end">INVOICE</h2>
                        <div class="p-2 text-center text-capitalize">
                            <span
                                class="
                                @if ($invoice->status == 'not_paid') bg-danger-subtle
                                @elseif($invoice->status == 'partially_paid') bg-warning-subtle
                                @elseif($invoice->status == 'paid') bg-success-subtle
                                @else bg-dark-subtle @endif
                                py-2 px-4">
                                {{ ucwords(str_replace('_', ' ', $invoice->status)) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                        <div>
                            <h2 class="mb-1">Billed To</h2>
                            <div class="text-muted">Tenant: {{ $invoice->userUnit->user->name }}</div>
                            <div class="text-muted">Unit: {{ $invoice->userUnit->unit->name }}</div>
                            <div class="text-muted">Phone: {{ $invoice->userUnit->user->phone }}</div>
                            <div class="text-muted">Email: {{ $invoice->userUnit->user->email }}</div>
                        </div>
                        <div class="text-end">
                            @php
                                $number = str_pad($invoice->id, 6, '0', STR_PAD_LEFT);
                                $number = 'I-' . $number;
                            @endphp
                            <h2>Invoice No: {{ $number }}</h2>
                            <div class="text-muted">Date: {{ $invoice->createdAt }}</div>
                        </div>
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table">
                            <thead class="border-bottom">
                                <tr>
                                    <th>Item</th>
                                    @if ($invoice->type == 'water')
                                        <th>Reading</th>
                                        <th>Usage</th>
                                    @endif
                                    <th>Month</th>
                                    <th class="text-end">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-capitalize text-center">
                                        {{ ucwords(str_replace('_', ' ', $invoice->type)) }}
                                    </td>
                                    @if ($invoice->type == 'water')
                                        @php
                                            $waterReading = $invoice->userUnit
                                                ->waterReadings()
                                                ->where('month', $invoice->month)
                                                ->where('year', $invoice->year)
                                                ->first()?->reading;

                                            $waterUsage = $invoice->userUnit
                                                ->waterReadings()
                                                ->where('month', $invoice->month)
                                                ->where('year', $invoice->year)
                                                ->first()?->usage;
                                        @endphp
                                        <td class="text-center">{{ $waterReading }}</td>
                                        <td class="text-center">{{ $waterUsage }}</td>
                                    @endif
                                    <td class="text-center">{{ $months[$invoice->month] }}</td>
                                    <td class="text-end">
                                        <small class="me-1">KES</small>
                                        {{ number_format($invoice->amount) }}
                                    </td>
                                </tr>
                                @foreach ($payments as $payment)
                                    <tr>
                                        <td class="text-center">Payment</td>
                                        <td class="text-center">{{ $months[$payment->month] }}</td>
                                        <td class="text-end">
                                            <small class="me-1">KES</small>
                                            {{ number_format($payment->amount) }}
                                        </td>
                                    </tr>
                                @endforeach
                                @foreach ($creditNotes as $creditNote)
                                    <tr>
                                        <td class="text-center">Credit Note</td>
                                        <td class="text-center">{{ $months[$creditNote->month] }}</td>
                                        <td class="text-end">
                                            <small class="me-1">KES</small>
                                            {{ number_format($creditNote->amount) }}
                                        </td>
                                    </tr>
                                @endforeach
                                @foreach ($deductions as $deduction)
                                    <tr>
                                        <td class="text-center">Deduction</td>
                                        <td class="text-center">{{ $months[$deduction->month] }}</td>
                                        <td class="text-end">
                                            <small class="me-1">KES</small>
                                            {{ number_format($deduction->amount) }}
                                        </td>
                                    </tr>
                                @endforeach
                                <tr class="border-bottom border-top">
                                    <td colspan="{{ $invoice->type == 'water' ? 3 : 0 }}"></td>
                                    <td class="fw-normal text-end">Total</td>
                                    <td class="fw-normal text-end">
                                        <small class="fw-normal me-1">KES</small>
                                        {{ number_format($invoice->amount) }}
                                    </td>
                                </tr>
                                <tr class="border-bottom border-top">
                                    <td colspan="{{ $invoice->type == 'water' ? 3 : 0 }}"></td>
                                    <td class="fw-normal text-end">Paid</td>
                                    <td class="fw-normal text-end">
                                        <small class="fw-normal me-1">KES</small>
                                        {{ number_format($invoice->paid) }}
                                    </td>
                                </tr>
                                <tr class="border-bottom border-top">
                                    <td colspan="{{ $invoice->type == 'water' ? 3 : 0 }}"></td>
                                    <td class="fw-normal text-end">Balance</td>
                                    <td class="fw-normal text-end">
                                        <small class="fw-normal me-1">KES</small>
                                        {{ number_format($invoice->balance) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4 class="text-center mb-2">Thank you for your tenancy!</h4>
                <div class="card-footer d-flex justify-content-start bg-white border-0">
                    <div class="text-start">
                        <h3 class="text-dark mb-1">Black Property</h3>
                        <div>Email: al@black.co.ke</div>
                        <div>Phone: +254 700 364446</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
