import { validateToken } from "./auth/auth_service";


const endpoints = [
    "auth",
    "user"
];


export default function (app: any) {
    endpoints.forEach((item) => {
        console.info(`starting endpoint ${item}`);
        try {

            if(item === "auth" ) {

                console.log("routes::auth - No authentication required for this route", item);
                app.use(`/${item}`, require(`./${item}/routes`));
            
            }else {
                app.use(`/${item}`, validateToken, require(`./${item}/routes`));
            }
            
        } catch (err) {
            console.log("routes::ConfigurationError", err);
        }
    });
}
