# CodaTrail Software
website/firebase


Pi till firebase och tillbaka:

1. Spelaren loggar in på webben
        ↓
2. Webben skriver uid till gameSessions/{uid}
        ↓
3. Pi läser uid från sessionen
        ↓
4. Pi hämtar spelarens sparade data från Firebase:
   - tidigare levels
   - highscores
   - medaljer/stjärnor
   - nuvarande level
        ↓
5. Spelet startar med spelarens data inladdad
        ↓
6. Spelaren spelar klart en bana
        ↓
7. Pi skriver tillbaka resultat till Firebase:
   - score
   - stars
   - success
   - ny progress
        ↓
8. Webben uppdateras automatiskt i realtid

Steg 3 mer datalj:

Firebase Console
    ↓ serviceAccountKey.json

Webben använder Firebase Auth för att verifiera användare med email/lösenord.
Pi är ingen webbläsare och kan inte logga in på samma sätt, 
därför får Pi istället en speciell nyckel som bevisar att den är betrodd.

Raspberry Pi
    ↓ pip install firebase-admin
    ↓ firebase_service.py kopplar upp
    ↓ session_listener.py lyssnar på gameSessions/{uid}
    ↓ run_game() kör spelet
    ↓ result_uploader.py skriver till gameResults/{uid}
        ↓
Firebase Firestore
        ↓ onSnapshot() triggas
Webben uppdateras automatiskt
