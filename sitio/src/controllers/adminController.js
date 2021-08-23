module.exports = {
    index : (req,res) => {
        return res.render('admin/productCreate')      
    },

    store: (req,res) => {

    },

    edit: (req,res) => {
        return res.render('admin/productEdit')
    },

    update: (req,res) => {

    },

    destroy: (req,res) => {
        
    }
    
}