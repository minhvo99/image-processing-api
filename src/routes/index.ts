import router from "./get-image.route";
function route(app) {
    app.use("/", router);
}
export default route;
