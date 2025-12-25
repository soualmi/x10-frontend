#!/bin/bash

# Définir un produit à tester
product='{
  "id": "p-1",
  "title": "Slushie Cup",
  "category": "Kitchen & Dining",
  "listingText": "Gobelet glacé. Facile à utiliser. Questions: compatible? nettoyage?"
}'

# Utiliser curl pour appeler l'API et tester la transformation
response=$(curl -sS -X POST http://127.0.0.1:3001/api/oracle/analyze \
  -H 'Content-Type: application/json' \
  -d "$product")

# Afficher la réponse de l'API Oracle
echo "Réponse de l'API Oracle :"
echo "$response"
product='{"id":"p-1","title":"Slushie Cup","category":"Kitchen & Dining","listingText":"Gobelet glacé. Facile à utiliser. Questions: compatible? nettoyage?"}'
response=$(curl -sS -X POST http://127.0.0.1:3001/api/oracle/analyze -H 'Content-Type: application/json' -d "$product")
echo 'Réponse de l'API Oracle :'
echo "$response"
