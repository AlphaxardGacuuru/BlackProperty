curl -X POST https://messages-sandbox.nexmo.com/v1/messages \
-u '2a2fab18:up)Nx%9Q' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
    "from": "14157386102",
    "to": "254700364446",
    "message_type": "text",
    "text": "This is a WhatsApp Message sent from the Messages API",
    "channel": "whatsapp"
  }'