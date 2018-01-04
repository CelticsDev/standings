jQuery(document).ready(function() {
	jQuery.ajax({
	    url: 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/00_standings.json',
	    async: false,
	    success: function(standingsData) {
	        for (let i = 0; i < standingsData.sta.co.length; i++) {
	            for (let x = 0; x < standingsData.sta.co[i].di.length; x++) {
	                for (let t = 0; t < standingsData.sta.co[i].di[x].t.length; t++) {
	                    var conferences = ['.east', '.west'];
	                    var place = standingsData.sta.co[i].di[x].t[t].see;
	                    var rowHTML = '';
	                    var activeStatus = '';
	                    if (standingsData.sta.co[i].di[x].t[t].see <= 8) {
	                        seed = standingsData.sta.co[i].di[x].t[t].see;
	                    }
	                    if (standingsData.sta.co[i].di[x].t[t].ta == 'BOS') {
	                        activeStatus = 'active';
	                    }
	                    var index = ['see','w','l','gb','cr','dr','hr','ar','l10','str'];
	                    for (o = 0; o < index.length; o++){
	                    	if (o == 0){
	                    		rowHTML += '<td class=' + standingsData.sta.co[i].di[x].t[t].ta + '><span>' + standingsData.sta.co[i].di[x].t[t].see + '</span>&nbsp;&nbsp;' + standingsData.sta.co[i].di[x].t[t].tc.toUpperCase() + ' ' + standingsData.sta.co[i].di[x].t[t].tn.toUpperCase() + '</td>';
	                    	}
	                    	else {
	                    		rowHTML += '<td>' + standingsData.sta.co[i].di[x].t[t][index[o]] + '</td>';
	                    	}
	                    }
	                    jQuery(conferences[i] + ' tr:nth-child(' + (place + 2) + ')').html(rowHTML);
	                    jQuery(conferences[i] + ' tr:nth-child(' + (place + 2) + ')').addClass(activeStatus);
	                }
	            }
	        }
	    }
	});
});

jQuery('.west tr:nth-child(1)').html('<td>THDDL</td>');