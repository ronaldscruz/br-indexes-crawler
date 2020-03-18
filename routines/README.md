# WIP - Routines

Routines are responsible for inserting API indexes in the database. It is seriously recommended to run them inside an Apache folder (/var/www/html in Ubuntu). They're completely customizable since they're made to supply different databases and needs.

## How to run

To run routines, follow these steps:

- Access routines folder:

```
  cd routines
```

- Create a "logs" folder inside "routines/"

```
  mkdir logs
```

- Add write permissions to routines folder:

```
  chmod -R +755 .
```

- Run index.php in Terminal

```
  php7.2 index.php
```
