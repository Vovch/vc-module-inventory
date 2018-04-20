﻿angular.module('virtoCommerce.inventoryModule')
    .controller('virtoCommerce.inventoryModule.fulfillmentAddressesWidgetController', ['$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
        var blade = $scope.widget.blade;

        $scope.address = blade.currentEntity.address;
        var addressMetaFields = [
             {
                name: 'countryCode',
                templateUrl: 'countrySelector.html',
                priority: 4
            }, {
                name: 'regionName',
                title: 'core.blades.address-detail.labels.region',
                valueType: 'ShortText',
                priority: 5
            }, {
                name: 'city',
                title: 'core.blades.address-detail.labels.city',
                valueType: 'ShortText',
                 priority: 6
            }, {
                name: 'line1',
                title: 'core.blades.address-detail.labels.address1',
                valueType: 'ShortText',
                priority: 7
            },
            {
                name: 'postalCode',
                title: 'core.blades.address-detail.labels.zip-code',
                valueType: 'ShortText',
                priority: 9
            }, {
                name: 'email',
                title: 'core.blades.address-detail.labels.email',
                valueType: 'Email',
                priority: 10
            }, {
                name: 'phone',
                title: 'core.blades.address-detail.labels.phone',
                valueType: 'ShortText',
                priority: 11
            }];

        $scope.openBlade = function () {
            var newBlade = {
                id: 'coreAddressDetail',
                currentEntity: $scope.address ? $scope.address : { isNew: true  },
                metaFields : addressMetaFields,
                title: blade.title,
                subtitle: 'core.blades.address-detail.subtitle',
                controller: 'virtoCommerce.coreModule.common.coreAddressDetailController',
                confirmChangesFn: function (address) {

                    blade.currentEntity.address = address;
                    address.isEmpty = false;
                    if (blade.confirmChangesFn) {
                        blade.confirmChangesFn(address);
                    }
                },
                deleteFn: function (address) {
                    blade.currentEntity.address = {};
                },
                template: 'Modules/$(VirtoCommerce.Core)/Scripts/common/blades/address-detail.tpl.html'
            };
            bladeNavigationService.showBlade(newBlade, $scope.blade);
        };

        $scope.$watch('blade.currentEntity', function (data) {
            if (data && data.address) {
                $scope.address = data.address;
            }
        });


    }]);