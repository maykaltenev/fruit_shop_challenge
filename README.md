# fruit_shop_challenge

# Aufgabe: Webanwendung

Erstellen Sie eine Webanwendung in einem der folgenden Frameworks: Angular, React, Vue.
Unser Ziel ist es, ein Frontend für einen fiktiven Obstladen zu entwickeln. Das Backend-Team hat bereits fleißig an der Entwicklung der API gearbeitet. Sie können sich mit Hilfe der Dokumentation [hier](https://api.predic8.de/shop/docs).
Für unser MVP haben wir die folgenden User Stories ausgewählt, die erfüllt werden sollen.
Wir empfehlen dringend die Verwendung einer Komponentenbibliothek wie Material UI.
Wenn Sie sich dafür entscheiden, andere Bibliotheken von Drittanbietern einzubinden, abgesehen vom Framework und der Komponentenbibliothek, geben Sie bitte eine Zusammenfassung Ihrer Argumentation an. User Story 4 und 5 sind optional.

## User Stories

1. **Als Benutzer kann ich die Liste der verfügbaren Produkte anzeigen**

   _Akzeptanzkriterien:_

   - Ich kann alle Produkte in einer Liste sehen
   - Ich kann den Namen eines jeden Produkts sehen
   - Ich kann den Preis für jedes Produkt sehen
   - Ich kann eine Miniaturansicht des Produktbildes sehen

2. **Als Benutzer kann ich die Produkte nach Kategorien filtern, indem ich verschiedene Registerkarten auswähle**

   _Aufnahmekriterien:_

   - Ich sehe eine Registerkarten-Navigation am oberen Rand der Liste

   - Ich sehe eine Registerkarte für jede Kategorie und eine Registerkarte mit dem Namen 'Alle'

   - Wenn ich auf eine der Registerkarten klicke, werden in der Produktliste nur Artikel aus dieser Kategorie angezeigt

3. **Als Benutzer kann ich die Produkte mit Hilfe einer Autovervollständigungs-Eingabe nach Produktnamen filtern**

   _Aufnahmekriterien_:

   - Ich sehe oben auf der Seite ein Eingabefeld

   - Wenn ich einen Text in das Eingabefeld eingebe, erhalte ich Vorschläge für die möglichen Produktnamen

   - Wenn ich einen Text eingebe, wird die Produktliste gefiltert, so dass nur passende Produkteinträge angezeigt werden

4. **Als Benutzer kann ich mir die Details eines Produkts ansehen**

   _Akzeptanzkriterien:_

   - Wenn ich auf einen Eintrag in der Produktliste klicke, kann ich eine Detailansicht des Produkts sehen
   - Wenn ich die Seite neu lade, soll sie sich in der Detailansicht öffnen

5. **Als Benutzer kann ich die Produkte sehen, die ich kürzlich angesehen habe**

   _Akzeptanzkriterien:_

   - Wenn ich mir die Details eines Produkts ansehe, wird es zur Liste "kürzlich angesehen" hinzugefügt
   - Ich kann die letzten 5 Produkte sehen, deren Details ich angesehen habe (z. B. in einer Seitenleiste)
   - Der Inhalt der Liste "Kürzlich angesehen" bleibt auch nach dem Laden der Seite erhalten.
   - Local Storage ist zu verwenden

---

# Task: Web application

Create a web application in one of the following frameworks: Angular, React, Vue.
Our goal is to develop a frontend for a fictional fruit shop. The backend team has already been hard at work developing the API. You can make yourself familiar with it using the documentation [here](https://api.predic8.de/shop/docs).
For our MVP we have selected the following user stories, which should be fullfilled.
We highly recommend using a component library like Material UI.
If you choose to include other third party libraries, apart from the framework and component libary, please provide a summary of your reasoning. User story 4 and 5 are optional.

## User stories

1. **As a user I can view the list of available products**

   _Acceptance Criteria:_

   - I can see all products in a list
   - I can see the name of each product
   - I can see the price of each product
   - I can see a thumbnail of the product picture

2. **As a user I can filter the products by category by selecting different tabs**

   _Acceptance Criteria:_

   - I can see a tab navigation at the top of the list
   - I see a tab for each category and a tab called ‘All'
   - When I click on one of the tabs my products list only displays items of that category

3. **As a user I can filter the products by product name using an autocomplete input**

   _Acceptance Criteria:_

   - I can see an input field at the top of the page
   - When I enter some text in the input I get suggestions of the possible product names
   - When I enter some text the product list is filtered, so that only matching product entries are shown

4. **As a user I can view the details of a product**

   _Acceptance Criteria:_

   - When I click on a product list entry, I can see a detail view of the product
   - When reloading the page, it should open on the detail view

5. **As a user I can see the products I viewed recently**

   _Acceptance Criteria:_

- When viewing the details of a product it gets added to the "recently viewed” list
- I can see the last 5 products I viewed the details for (e.g. in a sidebar)
- The contents of my "recently viewed" list is persisted between page reloads
- Local Storage is to be used
