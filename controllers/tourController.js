const Tour = require('./../models/tourModels');

exports.getAllTours = async (req, res) => {
    try{
        const tours =  await Tour.find();
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: 'Data not found'
        })

    }
  
}

exports.getTour = async (req, res) => {
    try{
        const tour= await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'Tour not found'
        })
    }
    
    
}

exports.createTour = async (req, res) =>{
    try{
        // const newTour = new Tour({});
        // newTour.save();
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }catch(err){
        console.log(`Error ${err}`);
        res.status(400).json({
            status: 'fail',
            message: err
        });
    };
}

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: {
                data: null
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
