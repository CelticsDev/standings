jQuery(document).ready(function() {
    loadStandings(Drupal.settings.today.season_year);
    for (i = Drupal.settings.today.season_year; i > 2015; i--){
    	if ( i == Drupal.settings.today.season_year) {
    		jQuery(".season-select").append('<option selected value="' + i + '">' + i + '-' + (i+1) + ' SEASON</option>')
    	}
    	else {
    		jQuery(".season-select").append('<option value="' + i + '">' + i + '-' + (i+1) + ' SEASON</option>')
    	}
    }
    jQuery(".season-select").change(function() {
        loadStandings(jQuery(this).val());
    });
});

function loadStandings(year) {
    jQuery.ajax({
        url: 'http://data.nba.com/data/v2015/json/mobile_teams/nba/' + year + '/00_standings.json',
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
                        var index = ['see', 'w', 'l', 'gb', 'cr', 'dr', 'hr', 'ar', 'l10', 'str'];
                        for (o = 0; o < index.length; o++) {
                            if (o == 0) {
                                rowHTML += '<td class=' + standingsData.sta.co[i].di[x].t[t].ta + '><p class="seed">' + standingsData.sta.co[i].di[x].t[t].see + '</p><div class="logo-wrap"><img class="logo" src=http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/' + standingsData.sta.co[i].di[x].t[t].ta + '.svg></div><p class="team-name">' + standingsData.sta.co[i].di[x].t[t].tc.toUpperCase() + ' ' + standingsData.sta.co[i].di[x].t[t].tn.toUpperCase() + '</p><p class="team-abbreviation">' + standingsData.sta.co[i].di[x].t[t].ta + '</p></td>';
                            } else {
                                rowHTML += '<td>' + standingsData.sta.co[i].di[x].t[t][index[o]] + '</td>';
                            }
                        }
                        jQuery(conferences[i] + ' tr:nth-child(' + (place + 2) + ')').html(rowHTML);
                        jQuery('tr').removeClass('active');
                        if (standingsData.sta.co[i].di[x].t[t].ta == 'BOS') {
      						jQuery(conferences[i] + ' tr:nth-child(' + (place + 2) + ')').addClass('active');
                        }

                    }
                }
            }
        }
    });
}