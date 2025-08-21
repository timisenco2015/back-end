import {Router} from "express";
const router = Router();

const task = require('../components/apps/tasks');
const taskPath = task.mount(router);
// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [ taskPath],
  });
});


// const getSpec = () => {
//   const rawSpec = fs.readFileSync(path.join(__dirname, '../docs/v1.api-spec.yaml'), 'utf8');
//   const spec = yaml.load(rawSpec);
//   spec.servers[0].url = `${config.get('server.basePath')}/api/v1`;
//   spec.components.securitySchemes.OpenID.openIdConnectUrl = `${config.get('server.oidc.serverUrl')}/realms/${config.get('server.oidc.realm')}/.well-known/openid-configuration`;
//   return spec;
// };

// // Base v1 Responder
// router.get('/', (_req, res) => {
//   res.status(200).json({
//     endpoints: ['/docs', '/status', proxyPath, filePath, formPath, permissionPath, rbacPath, rolePath, submissionPath, userPath, bcaddress, publicPath, utilsPath],
//   });
// });

// /** OpenAPI Docs */
// router.get('/docs', (_req, res) => {
//   const docs = require('../docs/docs');
//   res.send(docs.getDocHTML('v1'));
// });

// /** OpenAPI YAML Spec */
// router.get('/api-spec.yaml', (_req, res) => {
//   res.status(200).type('application/yaml').send(yaml.dump(getSpec()));
// });

// /** OpenAPI JSON Spec */
// router.get('/api-spec.json', (_req, res) => {
//   res.status(200).json(getSpec());
// });

export const v1Router = router;
