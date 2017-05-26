module.exports = (function(){
    return {
        sampleRoute: function(req,res){
            return res.json({success:"route works!"})
        }
 }
})();