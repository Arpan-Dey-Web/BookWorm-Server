
import { Router } from "express"
import { shelvesController } from "./shelves.controller";

const router = Router()

// add to shelf
router.post("/add-to-shelf",shelvesController.addToShelf )


// update shelf 
router.patch("/update-progress", shelvesController.updateProgress);





export const shelvesRoutes = router;