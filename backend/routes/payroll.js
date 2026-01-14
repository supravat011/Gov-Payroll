import express from 'express';
import { Payroll } from '../models/index.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all payroll records (Admin/Officer only)
router.get('/', authMiddleware, roleMiddleware('ADMIN', 'OFFICER'), (req, res) => {
    try {
        const payrolls = Payroll.findAll();
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get payroll by employee ID
router.get('/employee/:employeeId', authMiddleware, (req, res) => {
    try {
        // Check if user is accessing their own payroll or is admin/officer
        if (req.user.role === 'EMPLOYEE' && req.user.employeeId != req.params.employeeId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const payrolls = Payroll.findByEmployee(req.params.employeeId);
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific payroll record
router.get('/:id', authMiddleware, (req, res) => {
    try {
        const payroll = Payroll.findById(req.params.id);
        if (!payroll) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }

        // Check permissions
        if (req.user.role === 'EMPLOYEE' && req.user.employeeId != payroll.employee_id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        res.json(payroll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate payroll (Officer/Admin only)
router.post('/', authMiddleware, roleMiddleware('ADMIN', 'OFFICER'), (req, res) => {
    try {
        const { employeeId, month, year, basicPay, hra, deductions } = req.body;

        // Calculate net pay
        const netPay = basicPay + (hra || 0) - (deductions || 0);

        const result = Payroll.create(
            employeeId,
            month,
            year,
            basicPay,
            hra || 0,
            deductions || 0,
            netPay
        );

        res.status(201).json({
            message: 'Payroll generated successfully',
            payrollId: result.lastInsertRowid,
            netPay
        });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Payroll already exists for this month/year' });
        }
        res.status(500).json({ error: error.message });
    }
});

export default router;
