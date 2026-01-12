# Diagramme UML — E-learning Platform

```mermaid
classDiagram
  direction LR
  class User {
    +string id
    +string email
    +string fullName
    +string role
  }

  class Course {
    +string id
    +string title
    +string description
    +string category
    +Difficulty difficulty
    +number estimatedHours
  }

  class Chapter {
    +string id
    +string title
    +number order
    +number duration
    +string synopsis
  }

  class Quiz {
    +string id
    +number minimumScore
    +QuizQuestion[] questions
  }

  class ProgressSnapshot {
    +string userId
    +string courseId
    +number completedChapters
    +number totalChapters
    +number averageScore
    +string[] badges
    +Date lastAccessedAt
  }

  class Certificate {
    +string id
    +string courseId
    +string userId
    +Date issuedAt
    +string status
  }

  User "1" -- "*" ProgressSnapshot : suit
  Course "1" -- "*" Chapter : contient
  Course "1" -- "0..1" Quiz : évalue
  Course "1" -- "*" ProgressSnapshot : suivi
  Course "1" -- "*" Certificate : délivre
  User "1" -- "*" Certificate : reçoit
  Chapter "1" -- "0..1" Quiz : alimente
```

Ce diagramme capture le modèle de données métier et peut être exporté visuellement via n'importe quel outil supportant Mermaid (ex : VS Code, GitHub, Mermaid Live Editor).
