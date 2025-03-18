"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoicePageCount = exports.getInvoicesPaginated = exports.getInvoiceCount = exports.getInvoiceStatusCount = exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.findInvoiceById = exports.findInvoices = void 0;
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const invoicesRepository = new repositories_1.InvoicesRepository();
const invoicesService = new services_1.InvoiceService(invoicesRepository);
const customerRepository = new repositories_1.CustomerRepository();
const customerService = new services_1.CustomerService(customerRepository);
const findInvoices = async (req, res) => {
    try {
        const invoices = await invoicesService.findInvoices({}, {}, { limit: 5 });
        if (invoices.length === 0) {
            res.status(404).json({ message: "no Invoices Found." });
            return;
        }
        const result = invoices.map(x => {
            return {
                id: x._id,
                amount: x.amount,
                email: x.customer.email,
                image_url: x.customer.image_url,
                name: x.customer.name
            };
        });
        res.json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findInvoices = findInvoices;
const findInvoiceById = async (req, res) => {
    try {
        const invoices = await invoicesService.findInvoiceById(req.params.id);
        if (!invoices) {
            res.status(404).json({ message: "Not role Found" });
            return;
        }
        const result = {
            id: invoices._id,
            customer_id: invoices.customer._id,
            amount: invoices.amount,
            status: invoices.status
        };
        res.json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findInvoiceById = findInvoiceById;
const createInvoice = async (req, res) => {
    const customerID = req.body.customer;
    try {
        const customerExists = await customerService.findCustomerById(customerID);
        if (!customerExists) {
            res.status(400).json({ message: "Customer does not exists" });
            return;
        }
        const newInvoice = req.body;
        const result = await invoicesService.createInvoice(newInvoice);
        res.status(201).json({ message: 'Invoice Created', result });
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json(error);
    }
};
exports.createInvoice = createInvoice;
const updateInvoice = async (req, res) => {
    try {
        const invoices = await invoicesService.updateInvoice(req.params.id, req.body);
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        res.json(invoices);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.updateInvoice = updateInvoice;
const deleteInvoice = async (req, res) => {
    try {
        const invoices = await invoicesService.deleteInvoice(req.params.id);
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        res.json(invoices);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.deleteInvoice = deleteInvoice;
const getInvoiceStatusCount = async (_, res) => {
    try {
        const invoices = await invoicesService.invoicesStatusCount();
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        res.json(invoices);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.getInvoiceStatusCount = getInvoiceStatusCount;
const getInvoiceCount = async (_, res) => {
    try {
        const invoices = await invoicesService.invoicesCount();
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        res.json(invoices);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.getInvoiceCount = getInvoiceCount;
const getInvoicesPaginated = async (req, res) => {
    try {
        const invoices = await invoicesService.invoicePaginated(req.query.q, Number(req.query.page));
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        res.json(invoices);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.getInvoicesPaginated = getInvoicesPaginated;
const getInvoicePageCount = async (req, res) => {
    const itemsParPage = 6;
    try {
        const invoices = await invoicesService.invoicesPagesCount(req.query.q);
        console.log("invoices from invoice count:>> ", invoices);
        if (!invoices) {
            res.status(404).json({ message: "Not Invoice Found" });
            return;
        }
        const { totalCount } = invoices;
        const totalPages = Math.ceil(totalCount / itemsParPage);
        res.json(totalPages);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.getInvoicePageCount = getInvoicePageCount;
