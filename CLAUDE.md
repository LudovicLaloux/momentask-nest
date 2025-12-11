# Guide de développement API Habits - NestJS

Ce guide vous accompagne dans la création d'une API RESTful CRUD pour un tracker d'habitudes avec NestJS, PostgreSQL et TypeORM.

---

## Phase 1 : Installation des dépendances

Installez les packages nécessaires pour TypeORM et PostgreSQL.

**Commandes à exécuter :**
```bash
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config
npm install class-validator class-transformer
```

**Documentation :**
- [NestJS TypeORM](https://docs.nestjs.com/techniques/database)
- [NestJS Validation](https://docs.nestjs.com/techniques/validation)

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

## Phase 4 : Configuration de la validation globale

Activez la validation automatique des DTOs dans votre application.

**Ce que vous devez faire :**
1. Dans le fichier `src/main.ts`, ajoutez un `ValidationPipe` global
2. Configurez-le avec `whitelist: true` pour supprimer les propriétés non définies
3. Utilisez `transform: true` pour transformer automatiquement les payloads

**Exemple :**
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));
```

**Documentation :** [NestJS Validation](https://docs.nestjs.com/techniques/validation)

---

## Phase 5 : Génération du module Habits

Utilisez la CLI NestJS pour générer automatiquement la structure de base.

**Commande à exécuter :**
```bash
nest generate resource habits
```

**Questions de la CLI :**
- Transport layer ? → **REST API**
- Generate CRUD entry points ? → **Yes**

**Fichiers générés :**
- `habits.module.ts` - Module
- `habits.service.ts` - Service (logique métier)
- `habits.controller.ts` - Controller (gère les routes HTTP)
- DTOs (create-habit.dto.ts, update-habit.dto.ts)
- Entity de base

**Documentation :** [CLI Generate Command](https://docs.nestjs.com/cli/usages#nest-generate)

---

## Phase 6 : Création de l'Entity Habit

Définissez la structure de votre table PostgreSQL dans `src/habits/entities/habit.entity.ts`.

**Ce que vous devez faire :**
1. Décorez la classe avec `@Entity()` pour TypeORM
2. Ajoutez les colonnes :
   - `@PrimaryGeneratedColumn()` pour l'ID
   - `@Column()` pour les autres champs (ex: name, description, frequency)
   - `@CreateDateColumn()` et `@UpdateDateColumn()` pour les timestamps

**Important :** Avec REST, vous n'avez besoin que des décorateurs TypeORM, pas de décorateurs GraphQL.

**Documentation :**
- [TypeORM Entities](https://typeorm.io/entities)

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

## Phase 9 : Création des DTOs REST

Définissez la structure des données entrantes avec validation.

**Ce que vous devez faire :**
1. Dans `src/habits/dto/create-habit.dto.ts` :
   - Ajoutez les propriétés nécessaires (name, description, etc.)
   - Utilisez les décorateurs de validation (`@IsString()`, `@IsNotEmpty()`, etc.)
2. Dans `src/habits/dto/update-habit.dto.ts` :
   - Étendez `PartialType(CreateHabitDto)` pour rendre tous les champs optionnels

**Exemple :**
```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
```

**Documentation :** [NestJS DTOs](https://docs.nestjs.com/controllers#request-payloads)

---

## Phase 10 : Implémentation du Controller

Exposez vos endpoints REST dans `src/habits/habits.controller.ts`.

**Ce que vous devez faire :**
1. Les méthodes avec `@Get()` lisent les données
2. Les méthodes avec `@Post()` créent des données
3. Les méthodes avec `@Patch()` ou `@Put()` modifient des données
4. Les méthodes avec `@Delete()` suppriment des données
5. Utilisez `@Param()` pour les paramètres d'URL et `@Body()` pour le corps de la requête

**Exemple :**
```typescript
@Controller('habits')
export class HabitsController {
  @Get()
  findAll() {
    return this.habitsService.findAll();
  }

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(+id);
  }
}
```

**Documentation :** [NestJS Controllers](https://docs.nestjs.com/controllers)

---

## Phase 11 : Test de votre API

Testez votre API REST avec un client HTTP (Postman, Insomnia, curl, ou extension VSCode REST Client).

**Ce que vous devez faire :**
1. Lancez l'application : `npm run start:dev`
2. Utilisez un client HTTP pour tester vos endpoints
3. L'API sera disponible sur `http://localhost:3000`

**Exemples de requêtes :**

**GET - Récupérer toutes les habitudes :**
```
GET http://localhost:3000/habits
```

**POST - Créer une nouvelle habitude :**
```
POST http://localhost:3000/habits
Content-Type: application/json

{
  "name": "Méditation",
  "description": "10 minutes chaque matin"
}
```

**GET - Récupérer une habitude spécifique :**
```
GET http://localhost:3000/habits/1
```

**PATCH - Modifier une habitude :**
```
PATCH http://localhost:3000/habits/1
Content-Type: application/json

{
  "description": "15 minutes chaque matin"
}
```

**DELETE - Supprimer une habitude :**
```
DELETE http://localhost:3000/habits/1
```

**Documentation :** [Testing REST APIs](https://docs.nestjs.com/controllers#testing)

---

## Concepts clés

- **Entity** : Représente une table dans PostgreSQL
- **Repository** : Interface pour interagir avec la base de données
- **Service** : Contient la logique métier
- **Controller** : Expose les endpoints REST (routes HTTP)
- **DTO (Data Transfer Object)** : Valide et structure les données entrantes
- **Module** : Regroupe et organise les composants liés
- **Validation Pipe** : Valide automatiquement les données entrantes selon les règles définies dans les DTOs

---

## Ressources utiles

- [Documentation NestJS](https://docs.nestjs.com/)
- [Documentation TypeORM](https://typeorm.io/)
- [NestJS Controllers](https://docs.nestjs.com/controllers)
- [NestJS Validation](https://docs.nestjs.com/techniques/validation)
- [Class Validator Decorators](https://github.com/typestack/class-validator#validation-decorators)

---

Bonne chance dans votre apprentissage de NestJS ! 🚀
