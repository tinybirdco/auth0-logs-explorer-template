
## Getting Started

Start Tinybird locally:

```bash
cd tinybird
tb local start
tb login
tb dev
token ls  # copy an admin token
```

Deploy the Tinybird project to the cloud:

```bash
cd tinybird
tb --cloud deploy
```

## Customization

Adapt the [logs.datasource](./datasources/logs.datasource) and pipes accordingly to match your application's log schema.

Once you've made the changes in Tinybird, instrument your application and adapt the `tinybird.ts` library and components accordingly to support the new pipes and parameters.
