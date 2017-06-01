module.exports = {
    getMinMaxElevel : function (sheet,queryName, callback){
        var columnName = 'C';
        var rowName = 2;
        var cellAddr = columnName + rowName.toString();   
        var minAddr = '';
        var maxAddr = '';
        var eLevelAddr = '';
       
        for (var row_index = rowName;sheet[cellAddr] != undefined ;row_index++){
            cellAddr  = columnName + row_index.toString();   
            if (sheet[cellAddr] != undefined && sheet[cellAddr].v === queryName)
            {
                minAddr = 'G' + row_index.toString();
                maxAddr = 'H' + row_index.toString();
                eLevelAddr = 'E' + row_index.toString();     
                break;
            }

        }

        if (minAddr === '' ||
            maxAddr === '' ||
            eLevelAddr === ''
         )
         {
            callback(false, "Variable not found");
         }
         else{
            var ret_value = {
              minValue : sheet[minAddr].v,
              maxValue : sheet[maxAddr].v,
              eLevelValue : sheet[eLevelAddr].v
            };
            callback(true,ret_value);
         }
    }
};

