# Outer Rim &middot;

>The Outer Rim is a lawless place

Why this name: The largest region in the galaxy, also known as the Outer Systems, or simply the Rim, appears in the Star Wars universe.

Repository for all things related to Outer Rim.

## Repositories

- [sky-walker](https://github.com/outer-rim/skywalker): Backend repo for DBMS Mini Project
- [jade-jupiter](https://github.com/outer-rim/Jade-Jupiter): Frontend repo for DBMS Mini Project
- [Query-Optimizer](https://github.com/outer-rim/Query-Optimiser): Term Project for DBMS
- [Sciatica](https://github.com/outer-rim/Sciatica): Term Project submission for IR

### DBMS Mini Project

```mermaid
sequenceDiagram;
actor User;
User->>Jade-Jupiter: Interaction through forms;
activate Jade-Jupiter;
Jade-Jupiter->>skywalker: API request [with Bearer token];
activate skywalker;
loop Authorization;
    skywalker->>skywalker: token validity + check role;
end;
skywalker->>Jade-Jupiter: API response;
critical connection to the database;
    skywalker-->database: connect;
end;
skywalker->>database: ORM converted query;
activate database;
database->>skywalker: database query results;
deactivate database;
deactivate skywalker;
Jade-Jupiter-->>User: Results;
deactivate Jade-Jupiter;
```

### DBMS Term Project

```mermaid
sequenceDiagram;
actor User;
User->>Streamlit-app: Interaction through input text box;
activate Streamlit-app;
Streamlit-app->>call.py: Request to spawn child process;
activate call.py;

loop execute binary;
    ./a.out->>./a.out: Feed input and write results to file;
end;


./a.out->>call.py: SIGCHLD;

deactivate call.py;

Streamlit-app-->>User: Results from file;
deactivate Streamlit-app;
```

### IR Term Project
