function Load(rows,cols){
        $("#div1").empty();
        Game(rows,cols);
    }
    
    function Game(rows,cols) {
        if(rows==5){
            $('#div1').css("width","400px");
        }else if(rows==6){
            $('#div1').css("width","460px");
        }else{
            $('#div1').css("width","325px");
        }
        
        var array = new Array(rows*cols-1);

        for(var i=0;i<array.length;i++){
            array[i] = i+1;    
        }

        shuffle(array);

        for (var i = 0; i < rows*cols; i++) {
            var $newDiv;
            if(i==rows*cols-1)
                $newDiv = $("<div class='dragdiv'></div>");
            else
                $newDiv = $("<div class='dragdiv' id='btn"+ i +"'>"+array[i]+"</div>");

            makeElementAsDragAndDrop($newDiv);
            $("#div1").append($newDiv);
        }

        function shuffle(input){
            for(var i = input.length; i; ){
                var j = parseInt(Math.random() * i);
                var x = input[--i];
                input[i] = input[j];
                input[j]= x;
            }
        }

        function makeElementAsDragAndDrop(elem) {
            $(elem).draggable({
                revert: "invalid",
                helper: "clone",
                containment: "parent",
                cursor: "crosshair",
                zIndex : 100
            });
            $(elem).droppable({
                drop: function(event, ui) {
                    var $dragElem = $(ui.draggable).clone().replaceAll(this);
                    $(this).replaceAll(ui.draggable);
                    makeElementAsDragAndDrop(this);
                    makeElementAsDragAndDrop($dragElem);
                    handle();
                }
            });
        }

        function handle(){
            var count=1;
            $("#div1").children('.dragdiv').each(function(){
                if($(this).text()==count){
                    if(count==15){
                        alert('you win');
                        return;
                    }
                    count++;
                }else{
                    count=1;
                }
            });

        }
    };