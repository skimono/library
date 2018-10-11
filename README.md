# expedition

## School project - MMO Dungeon Crawler inspired by a world created in a famous 1980 roleplaying module

**Gra bedzie dungeon crawlerem w stylu "Eye of Beholder" albo "Bard's Tale 3".** 

### Rozgrywka

Gracz będzie przemierzal rozbity statek kosmiczny podzielony na sześcienne części, których każda strona ma przypisaną teksture (_img[placement]_ w [Wireframe mock-up](/docs/expedition_wireframe.png)) i jest wyswietlana na _"Character / encounter view"_. Taka jednostka bedzie stanowić jedną zamkniętą "ture" gry w obrębie której gracz może spotkać przeciwnika lub handlarza w postaci NPC albo innego gracza z ktorym może wejść w tą sama interakcje co z mobami. 

### Walka

Walka rozgrywana jest na postawie dwóch statystyk - punktów ataku i życia. Po napotkaniu innej postaci gra najpierw wyswietla wizerunek napotkanego moba i pyta czy chcesz z nim walczyc. W wypadku zgody rozgrywa ją automatycznie umieszczając opis rezultatu pojedynku. W zależności od tego czy punkty ataku moba sa wyzsze lub nizsze od gracza i w jakim stopniu, graczowi może zostać odebrana różna ilośc punktów życia. W nagrode po pojedynku gracz może dostac złoto, jakiś przedmiot i odpowiednią ilośc punktów doświadczenia, które w odpowiedniej ilości zwiększaja punkty ataku.

### Ekwipunek

W grze istnieje zarządzany przez gre system ekwipunku z dwoma slotami - na zbroje oraz na broń. Przy kupieniu lub znalezieniu któregoś z tych przedmiotów gra automatycznie wyposaża w niego gracza zwiększając o odpowiednią sume punkty ataku bądź zdrowa.

### Losowe zdarzenia

Eksplorując statek gracz może napotkać nie tylko inne postacie lub gracza, ale również specjalny event związany z decyzją, której efektem jest odpowiednia nagroda lub kara.
