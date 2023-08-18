import { Router } from 'express';
import controller from '../controllers/index';
// import Middlware from '../middlewares/index'

const router = Router();

router.get('/:userId/profile'); // GET /api/users/:userId/profile (مشاهده پروفایل کاربر خاص)
router.post('/:userId/fallow'); // POST /api/users/:userId/follow (فالو کردن کاربر خاص)
router.delete('/:userId/unfollow'); // DELETE /api/users/:userId/unfollow (عدم فالو کردن کاربر خاص)


// POST /api/users (ایجاد کاربر جدید)
// GET /api/users/:userId (مشاهده اطلاعات یک کاربر خاص)
// PUT /api/users/:userId (بروزرسانی اطلاعات یک کاربر خاص)
// DELETE /api/users/:userId (حذف یک کاربر خاص)

export default router;
