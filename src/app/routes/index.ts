import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FaqRoutes } from "../modules/Faq/faq.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { WishListRoutes } from "../modules/WishList/wishlist.route";
import { CartRoutes } from "../modules/Cart/cart.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/faq",
    route: FaqRoutes,
  },

  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/wishlist",
    route: WishListRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
