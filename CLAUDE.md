# Guide de développement API Habits - NestJS

Ce guide vous accompagne dans la création d'une API CRUD pour un tracker d'habitudes avec NestJS, PostgreSQL, TypeORM et GraphQL.

---

## Phase 1 : Installation des dépendances

Installez les packages nécessaires pour TypeORM, PostgreSQL et GraphQL.

**Commandes à exécuter :**
```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

**Documentation :**
- [NestJS TypeORM](https://docs.nestjs.com/techniques/database)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)

---

## Phase 2 : Configuration de PostgreSQL avec Docker Compose

Utilisez Docker Compose pour lancer PostgreSQL sans l'installer sur votre machine.

**Ce que vous devez faire :**

### Étape 2.1 : Créer le fichier `docker-compose.yml`

À la racine du projet backend, créez un fichier `docker-compose.yml`.

**Structure à suivre :**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: # Votre nom d'utilisateur
      POSTGRES_PASSWORD: # Votre mot de passe
      POSTGRES_DB: # Nom de votre base de données
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Ce que vous devez comprendre :**
- `image`: La version de PostgreSQL à utiliser
- `environment`: Les variables d'environnement pour initialiser PostgreSQL
- `ports`: Mappage du port (format `port_machine:port_conteneur`)
- `volumes`: Persiste les données entre les redémarrages

### Étape 2.2 : Créer le fichier `.env`

Créez un fichier `.env` à la racine du backend avec vos credentials :

```
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=votre_mot_de_passe
DATABASE_NAME=momentask
```

**Important :** Les valeurs doivent correspondre à celles de votre `docker-compose.yml`.

### Étape 2.3 : Ajouter `.env` au `.gitignore`

Ajoutez `.env` dans votre fichier `.gitignore` pour ne pas commiter vos credentials :

```
.env
```

### Étape 2.4 : Démarrer PostgreSQL

Lancez PostgreSQL avec Docker Compose :

```bash
docker-compose up -d
```

**Commandes utiles :**
```bash
# Arrêter PostgreSQL
docker-compose down

# Voir les logs
docker-compose logs -f postgres

# Vérifier l'état
docker-compose ps

# Se connecter à PostgreSQL
docker-compose exec postgres psql -U postgres -d momentask
```

**Documentation :**
- [Docker Compose PostgreSQL](https://hub.docker.com/_/postgres)
- [Docker Compose CLI](https://docs.docker.com/compose/reference/)

---

## Phase 3 : Configuration de TypeORM dans NestJS

Configurez TypeORM dans `src/app.module.ts` pour se connecter à PostgreSQL.

**Ce que vous devez faire :**
1. Ajoutez `TypeOrmModule.forRoot()` dans les imports de votre AppModule
2. Configurez les options de connexion (host, port, username, password, database)
3. Activez `autoLoadEntities: true` et `synchronize: true` (uniquement en développement)

**Astuce importante :**
- Utilisez le `ConfigModule` pour charger les variables d'environnement depuis `.env`
- Le type de base de données doit être casté : `type: 'postgres' as const` ou `type: config.database.type as 'postgres'`

**Documentation :** [TypeORM Integration](https://docs.nestjs.com/techniques/database#typeorm-integration)

---

## Phase 4 : Configuration de GraphQL

Activez GraphQL dans votre application.

**Ce que vous devez faire :**
1. Ajoutez `GraphQLModule.forRoot()` dans les imports de votre AppModule
2. Choisissez le driver Apollo (`ApolloDriver`)
3. Configurez `autoSchemaFile: true` pour générer automatiquement le schéma GraphQL

**Documentation :** [GraphQL Quick Start](https://docs.nestjs.com/graphql/quick-start#installation)

---

## Phase 5 : Génération du module Habits

Utilisez la CLI NestJS pour générer automatiquement la structure de base.

**Commande à exécuter :**
```bash
nest generate resource habits
```

**Questions de la CLI :**
- Transport layer ? → **GraphQL (code first)**
- Generate CRUD entry points ? → **Yes**

**Fichiers générés :**
- `habits.module.ts` - Module
- `habits.service.ts` - Service (logique métier)
- `habits.resolver.ts` - Resolver (équivalent du controller pour GraphQL)
- DTOs et Entity de base

**Documentation :** [CLI Generate Command](https://docs.nestjs.com/cli/usages#nest-generate)

---

## Phase 6 : Création de l'Entity Habit

Définissez la structure de votre table PostgreSQL dans `src/habits/entities/habit.entity.ts`.

**Ce que vous devez faire :**
1. Décorez la classe avec `@Entity()` pour TypeORM
2. Décorez la classe avec `@ObjectType()` pour GraphQL
3. Ajoutez les colonnes :
   - `@PrimaryGeneratedColumn()` pour l'ID
   - `@Column()` pour les autres champs (ex: name, description, frequency)
   - `@CreateDateColumn()` et `@UpdateDateColumn()` pour les timestamps

**Important :** Chaque propriété doit avoir deux décorateurs :
- Un pour TypeORM (`@Column()`)
- Un pour GraphQL (`@Field()`)

**Documentation :**
- [TypeORM Entities](https://typeorm.io/entities)
- [GraphQL Object Types](https://docs.nestjs.com/graphql/resolvers#object-types)

---

## Phase 7 : Configuration du Module Habits

Configurez `src/habits/habits.module.ts` pour utiliser TypeORM.

**Ce que vous devez faire :**
1. Importez `TypeOrmModule.forFeature([Habit])`
2. Cela rendra le repository de Habit disponible pour injection

**Documentation :** [TypeORM Repository Pattern](https://docs.nestjs.com/techniques/database#repository-pattern)

---

## Phase 8 : Implémentation du Service

Implémentez la logique métier dans `src/habits/habits.service.ts`.

**Ce que vous devez faire :**
1. Injectez le repository dans le constructeur : `@InjectRepository(Habit)`
2. Implémentez les méthodes CRUD :
   - `create()` → `repository.save()`
   - `findAll()` → `repository.find()`
   - `findOne()` → `repository.findOne()`
   - `update()` → `repository.update()` puis `findOne()`
   - `remove()` → `repository.delete()`

**Documentation :** [TypeORM Repository API](https://typeorm.io/repository-api)

---

## Phase 9 : Création des DTOs GraphQL

Définissez la structure des données entrantes.

**Ce que vous devez faire :**
1. Dans `src/habits/dto/create-habit.input.ts` :
   - Utilisez `@InputType()` au lieu de `@ObjectType()`
   - Ajoutez les champs avec `@Field()` (sans l'ID)
2. Dans `src/habits/dto/update-habit.input.ts` :
   - Étendez `PartialType(CreateHabitInput)`

**Documentation :** [GraphQL Mutations](https://docs.nestjs.com/graphql/mutations)

---

## Phase 10 : Implémentation du Resolver

Exposez vos queries et mutations GraphQL dans `src/habits/habits.resolver.ts`.

**Ce que vous devez faire :**
1. Les méthodes avec `@Query()` lisent les données (GET)
2. Les méthodes avec `@Mutation()` modifient les données (POST/PUT/DELETE)
3. Chaque méthode appelle le service correspondant
4. Spécifiez le type de retour GraphQL : `@Query(() => [Habit])`

**Documentation :** [GraphQL Resolvers](https://docs.nestjs.com/graphql/resolvers)

---

## Phase 11 : Test de votre API

Testez votre API via GraphQL Playground.

**Ce que vous devez faire :**
1. Lancez l'application : `npm run start:dev`
2. Ouvrez le GraphQL Playground : `http://localhost:3000/graphql`
3. Testez vos queries et mutations

**Exemple de mutation :**
```graphql
mutation {
  createHabit(createHabitInput: {
    name: "Méditation"
    description: "10 minutes chaque matin"
  }) {
    id
    name
  }
}
```

**Exemple de query :**
```graphql
query {
  habits {
    id
    name
    description
  }
}
```

**Documentation :** [GraphQL Playground](https://docs.nestjs.com/graphql/quick-start#accessing-the-playground)

---

## Concepts clés

- **Entity** : Représente une table dans PostgreSQL
- **Repository** : Interface pour interagir avec la base de données
- **Service** : Contient la logique métier
- **Resolver** : Expose les queries et mutations GraphQL
- **DTO (Data Transfer Object)** : Valide et structure les données entrantes
- **Module** : Regroupe et organise les composants liés

---

## Ressources utiles

- [Documentation NestJS](https://docs.nestjs.com/)
- [Documentation TypeORM](https://typeorm.io/)
- [Documentation GraphQL](https://graphql.org/)
- [Documentation Apollo Server](https://www.apollographql.com/docs/apollo-server/)

---

Bonne chance dans votre apprentissage de NestJS ! 🚀
