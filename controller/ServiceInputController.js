const ServiceInput = require('../model/ServiceInput')

const postServiceRequset = async (req, res) => {
    try{
        const {name, email, phone, company, service, msg} = req.body
        if (!name || !email || !phone || !company || !service) {
            return res.status(400).json({ message: 'Please enter all required details' });
        }
        const serviceInput = new ServiceInput({name, email, phone, company, service, msg})
        await serviceInput.save()
        res.status(201).json({message: 'Thankyou for choosing us We received you requset our customer care executive will contact you soon...'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

const getAllRequsets = async (req, res) => {
    try{
        const serviceInput = await ServiceInput.find()
        res.status(201).json(serviceInput)
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
}

const deleteRequsetById = async (req, res) => {
    try{
        const serviceInput = await ServiceInput.findByIdAndDelete(req.params.id)
        if (!serviceInput){
            return res.status(404).json({message: 'Requset not found'})
        }
        res.status(200).json({message: 'Request deleted succesfully'})
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
}

module.exports = {postServiceRequset, getAllRequsets, deleteRequsetById}