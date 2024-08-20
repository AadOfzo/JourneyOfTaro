Er is ook een pdf versie van de handleiding meegeleverd. Hier staan ook screenshots bij

1 Start een IDE naar jouw keuze deze applicatie is gebouwd met WebStorm op een MacBook pro mid 2012 op PORT=3000.
  Voor Windows verwijder PORT=3000 uit de package.json:
    "scripts": {
    "start": "PORT=3000 react-scripts start", <-- Verwijder PORT=3000
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
    },

   2 De applicatie starten
   2.1 Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:
        `npm install`
   2.2 Wanneer dit klaar is, kun je de applicatie starten met behulp van:
        `npm start`
        of gebruik de WebStorm knop (npm start). Open http://localhost:3000 om de pagina in de browser te bekijken. Voor Windows is dit een andere PORT.

3 Op de Home pagina staan 3 logo's waarop geklikt kan worden, hier kunnen later verschillende menu items aan toegevoegd kunnen  worden.
  Wanneer je niet bent ingelogd is alleen de About pagina beschikbaar.
  Wanneer je op Images of Music klikt komt er een LoadingComponent.
  Wanneer je inlogd als een ADMIN heb je andere functies in Images, Music en op de NavBar.
    3.1 Druk op Start tour in de NavBar om een "User" aan te maken of ga naar "Login" om in te loggen.
    3.1.a Login als ADMIN met user: Example_Admin_1 password: ExamplePassword2.
    3.1.b Er zijn nu meer opties voor de ADMIN in de verschillende pagina's ook is er een AdminDashboard
    3.1.c De verschillende menu's zijn voor
        -Users: User informatie bekijken, Admin rechten geven, user deleten (werkt niet).
        -Songs: Songs beluisteren met standaard player, downloaden (werkt niet) en deleten (werkt wel).
        -Images: Images bekijken, verwijderen, aan ImageGallery toevoegen (werkt niet).
3.2 Je kan nu images en songs uploaden. Bij Images moet je reloaden, maar in het Admin component niet. Songs kan alleen een Admin beluisteren.
3.2.b Alle files worden opgeslagen in http://localhost:8080/uploads/
