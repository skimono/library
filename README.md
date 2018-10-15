# expedition

## School project - MMO Dungeon Crawler inspired by a world created in a famous 1980 roleplaying module

**Gra bedzie dungeon crawlerem w stylu "Eye of Beholder" albo "Bard's Tale 3".** 

### Rozgrywka

Postac gracza rozpoczyna w pełniącym funkcje menu chałupniczym obozie ustawionym przy rozbitym statku kosmicznym. Do wyboru będzie miał odwiedzenie domu aukcyjnego z przedmiotami, podjęcie zadań od NPC i ostatecznie wyruszenie na ekspedycje.
Gracz będzie przemierzal statek podzielony na sześcienne części, których każda strona ma przypisaną teksture (_img[placement]_ w [Wireframe mock-up](/docs/expedition_wireframe.png)) i jest wyswietlana na _"Character / encounter view"_. Taka jednostka bedzie stanowić jedną zamkniętą "ture" gry w obrębie której gracz może spotkać przeciwnika lub handlarza w postaci NPC albo innego gracza z ktorym może wejść w tą sama interakcje co z mobami. 

### Walka

Walka rozgrywana jest na postawie dwóch statystyk - punktów ataku i życia. W zależności od sposobu napotkania przeciwnika gra będzie prosić o wykonanie różnych czynności. W wypadku gdy dojdzie do walki będzie ona rozgrywana jedną akcją na turę za pomocą podstawowych ataków i dostępnych przedmiotów w ekwipunku. W zależności od tego czy punkty ataku przeciwnika są wyższe lub niższe od gracza i w jakim stopniu, graczowi może zostać odebrana różna ilość punktów życia. W nagrodę po pojedynku gracz może dostać złoto, jakiś przedmiot i odpowiednią ilość punktów doświadczenia, które w pewnej ilości zwiększają poziom postaci. Wynik serii pojedynków zostanie umieszczony w rankingu globalnym.

### Ekwipunek

W grze istnieje zarządzany przez gre system ekwipunku z dwoma slotami - na zbroje oraz na broń. Przy kupieniu lub znalezieniu któregoś z tych przedmiotów gra automatycznie wyposaża w niego gracza zwiększając o odpowiednią sume punkty ataku bądź zdrowa.

### Losowe zdarzenia

Eksplorując statek gracz może napotkać nie tylko inne postacie lub gracza, ale również specjalny event związany z decyzją, której efektem jest odpowiednia nagroda lub kara.
