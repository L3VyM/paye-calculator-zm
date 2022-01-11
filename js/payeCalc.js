// Module initialisation connected to the PAYE tax HTML app
var app = angular.module("payeApp", []);

app.controller("myCtrl", ($scope) => {
    $scope.paye_calc = () => {

        // - g_amount as gross amount upon which PAYE amount is calculated on
        const g_amount = Number($scope.gross_amount);

        /* 
        - PAYE is calculated in bracket amount listed below
        - amount below and equal to 4500, amounts are PAYE free
        - other bands listed below are used to calculate PAYE depending on employee gross pay
        */
        const paye_1st_band = 4500.00;
        const paye_2nd_lower_band = 4500.01;
        const paye_2nd_higher_band = 4800;
        const paye_3rd_lower_band = 4800.01;
        const paye_3rd_higher_band = 6900.00;

        // Condition statement below check if g_amount with within the bracket defined above
        if (g_amount <= paye_1st_band) {
            $scope.lower_1st_bracket = paye_1st_band;
            $scope.perc_0 = $scope.lower_1st_bracket * 0.00;
        }

        if (g_amount >= paye_2nd_lower_band) {
            $scope.lower_2nd_bracket = paye_2nd_higher_band - paye_2nd_lower_band;
            $scope.perc_1 = $scope.lower_2nd_bracket * 0.25;

        }

        if (g_amount >= paye_3rd_lower_band) {
            $scope.lower_3rd_bracket = paye_3rd_higher_band - paye_3rd_lower_band;
            $scope.perc_2 = $scope.lower_3rd_bracket * 0.30;
        }

        if (g_amount >= paye_3rd_higher_band) {
            $scope.lower_3rd_bracket_max = g_amount - $scope.lower_2nd_bracket - $scope.lower_3rd_bracket - paye_1st_band;
            $scope.perc_3 = $scope.lower_3rd_bracket_max * 0.375;
        }
    }
});