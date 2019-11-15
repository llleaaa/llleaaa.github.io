function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(document).ready(function(){
    $("form").on("submit", function(e){
        e.preventDefault();
        //prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: $(".top_search").val().replace(/%20/g, "+"),
            maxResults: 7,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        });

        
        //exeute the request
        request.execute(function(response){
            var results = response.result;
            console.log(results);
            $.each(results.items, function(index, item){
                var title = item.snippet.title.substring(0,40);
                var videoid = item.id.videoId;
                var desc = item.snippet.description.substring(0,40);
                $(".list").append(`
                    <div class="side_article" data-key="${videoid}">
                        <iframe class="video w100" width="304" height="171" src="//www.youtube.com/embed/${videoid}" frameborder="0"></iframe>
                        <div class="side_details">
                            <h4>${title}</h4>
                            <p>${desc}</p>
                            <div class="side_collection"><i class="fa fa-star-o" aria-hidden="true"></i></div>
                        </div>
                        
                    </div>
                `);  
                
                $('.list').on('click','.side_article', function(){
                    var id = $(this).attr('data-key');
                    mainVid(id);
                });
            });
            
            
        });
        
    });
    
});

function mainVid(id) {
    $('.video-container').html(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer;  autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
} 


function init(){
    gapi.client.setApiKey("AIzaSyBOan_hm4qED12KzJbemsKuHU3f-38Lvbg");
    gapi.client.load("youtube", "v3", function(){

    });
}
