/************************************************* Page Load Colors *************************************************/
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    white_or_black = '#dbdbdb';
    purple_shade = '#cb3ede';
    green_shade = '#03c900';
}
else{
    white_or_black = 'black';
    purple_shade = '#770087';
    green_shade = '#0c6300';
}

/************************************************* Light/Dark Switch *************************************************/
/** Controls page-specific changes that must be made when toggling between light, sepia, and dark modes
 * @param {string} - the mode the user selects ('light', 'sepia', or 'dark')
 * */
function page_color_mode(mode){
    if(mode == 'dark'){
        dark_mode();
    }
    else if(mode == 'light' || mode == 'sepia'){
        light_mode();
    }
}

// Changes for dark mode
function dark_mode(){
    /* Why We Need Family Benefits Chart */
    whyWeNeedChart.data.colors({
        point: '#dbdbdb',
    });

    /* Problems Overview Chart */
    problemsOverviewChart.data.colors({
        married       : '#dbdbdb',
        point_married : '#dbdbdb',
        person2 : '#cb3ede',
        person2_dashed : '#cb3ede',
        point2: '#cb3ede',
    });

    /* Fixing Family Benefits Chart */
    fixingFamilyBenefitsChart.data.colors({
        total          : '#dbdbdb',
        existing_point : '#dbdbdb',
    });

    /* Two Tiers Chart */
    twoTiersChart.data.colors({
        total          : '#dbdbdb',
        existing_point : '#dbdbdb',
    });

    /* Marriage Penalty Chart */
    MPchart.data.colors({
        married       : '#dbdbdb',
        point_married : '#dbdbdb',
        person2 : '#cb3ede',
        person2_dashed : '#cb3ede',
        point2: '#cb3ede',
    });

    /* Marginal Tax Chart */
    marginalTaxChart.data.colors({
        point: '#dbdbdb',
    });

    /* Head of Household Chart */
    HOHchart.data.colors({
        point: '#dbdbdb',
    });
}

// Changes for light/sepia mode
function light_mode(){
    /* Why We Need Family Benefits Chart */
    whyWeNeedChart.data.colors({
        point: 'black',
    });

    /* Problems Overview Chart */
    problemsOverviewChart.data.colors({
        married       : 'black',
        point_married : 'black',
        person2 : '#770087',
        person2_dashed : '#770087',
        point2 : '#770087',
    });

    /* Fixing Family Benefits Chart */
    fixingFamilyBenefitsChart.data.colors({
        total          : 'black',
        existing_point : 'black',
    });

    /* Two Tiers Chart */
    twoTiersChart.data.colors({
        total          : 'black',
        existing_point : 'black',
    });

    /* Marriage Penalty Chart */
    MPchart.data.colors({
        married       : 'black',
        point_married : 'black',
        person2 : '#770087',
        person2_dashed : '#770087',
        point2 : '#770087',
    });

    /* Marginal Tax Chart */
    marginalTaxChart.data.colors({
        point: 'black',
    });

    /* Head of Household Chart */
    HOHchart.data.colors({
        point: 'black',
    });
}

