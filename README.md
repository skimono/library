# library

## School project - Basic personal book library system

### Podstawowe zalozenia

Program pozwala na dodawanie ksiazek wraz z garstka informacji na ich temat w ramach tworzenia listy ulubionych pozycji.

### Wykorzystane technologie

- Node.js
- React
- Firebase
- styled-components

### Niezbedne zaleznosci

- git
- Node.js 10.14 LTS
- wszystko co jest wpisane w `package.json` **(sposob instalacji ponizej)**

### Instalacja

```
git clone https://github.com/emanfred/library.git
cd library
npm install
```

### Uruchamianie

```
npm run dev
```

### Ukonczone zadania

1. Skonfigurować git cloud repository
2. Dodać logowanie / rejestrację
3. Dodać formularze do dodawania Autorów / Książek. Jeden autor może mieć wiele książek.
4. Dodać formularz do dodawania okładek książek - powiązanych z książkami - okładki powinny być zapisywane do GCS, w datastorze przetrzymywana ścieżka do pliku
5. Stworzyć listę ulubionych książek per użytkownik
6. Zdefiniować atrybuty dla autorów i książek i wpisać do formularzy
7. Dodać warstwę walidacyjną dla danych przesyłanych z zewnątrz.
8. ~~Skonfigurować TaskQue~~
9. Dodać jeden TaskWyzwalany tylko przez administratora, który po 10 sekundach się zakończy i wyśle powiadomienie mailowe
10. Skonfigurować i oprzeć warstwę frontend o wybrany framework jsowy (Vue / Angular itp)
11. ~~dodać wyszukiwanie książek w searchu~~
12. ~~dodać notyfikacje pub/sub przy wrzucaniu okładek, zapisać finalnie dane do Datastore~~
13. ~~Dodać autoryzację oAuth2~~
14. Dodać komunikację z zewnętrznym serwisem - np open weather map

