import { Router } from "express";
const router = Router();

/* import chatRouter from "./chats.router.js";
 */import productRouter from "./products.router.js";
import cartRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
import sessionRouter from "./session.router.js";
import homeRouter from "./home.router.js";
import ticketRouter from "./ticket.router.js";
/* import cartIdRouter from "./cartId.router.js"; */
import userRouter from "./user.router.js";
import emailRouter from "./email.router.js";
import gmailRouter from "./gmail.router.js";
import fakeProdRouter from ".//productMock.router.js";

router

  .use("/products", productRouter)
  .use("/carts", cartRouter)
/*   .use("/chat", chatRouter)
 */  .use("/home", homeRouter)
  .use("/tickets", ticketRouter)
  /* .use("/carts", cartIdRouter) */
  .use("/users", userRouter)
  .use("/", viewsRouter)
  .use("/sessions", sessionRouter)
  .use("/", emailRouter)
  .use("/", gmailRouter)
  .use("/fakeProducts", fakeProdRouter)

  .get("/"),
  (req, res) => {
    res.render("index", {});
  };
export default router;
