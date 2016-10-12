(function(window) {
    'use strict';

    /**
     * todoApp Module
     *
     * Description
     */
    var todoApp = angular.module('todoApp', ['ngRoute']);

    todoApp.controller('MainController', ['$scope', '$location','$routeParams', function($scope, $location,$routeParams) {

        //输入框中的数据
        $scope.text = "";

        //所有的列表数据
        $scope.todos = [
            { text: "抽烟", completed: true, id: 1 },
            { text: "喝酒", completed: false, id: 2 },
            { text: "烫头", completed: false, id: 3 },
        ];

        //添加一项
        $scope.addTodo = function() {

            // console.log('添加内容');
            //获取一个不重复的 id  1.取随机数 2.获取当前时间 3.
            if ($scope.text.length == 0) {
                return
            }
            //获取当前的时间戳
            var id = new Date().getTime();

            $scope.todos.push({ text: $scope.text, completed: false, id: id });
            $scope.text = '';
        }

        //删除一项
        $scope.removeTodo = function( /*id*/ index) {
            $scope.todos.splice(index, 1);
        }

        //当前编辑的条目的下标
        $scope.editIndex = -1;
        //编辑
        $scope.editTodo = function(e, index) {

            //双击条目时,保存当前点击的条目的下标
            $scope.editIndex = index;
            // console.log(window.event)
            // console.log(e)

        }

        //保存,修改完毕后保存
        $scope.saveTodo = function(event) {
            //回车键按下
            if (event.keyCode == 13) {
                //所有条目设置为非完成状态
                $scope.editIndex = -1;
            }

        }

        //计算个数
        $scope.leftCount = function() {
            var count = 0;
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {
                    count++;
                }
            }
            //与上面的判断等价,count=0时是 false,取反就是 true
            $scope.allChecked = !count;
            return count;
        }

        //选择全部
        // var all = true;
        $scope.toggleAll = function() {

            for (var i = 0; i < $scope.todos.length; i++) {

                //所有条目的完成状态根据全选按钮的状态来切换
                //如果全选按钮的状态是选中状态,那么此时点击时,应该将所有条目的状态改为未完成
                $scope.todos[i].completed = !$scope.allChecked;
            }
            // all = !all;
        }

        //清除已经完成
        $scope.existCompleted = function() {

            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].completed) {
                    return true;
                }
            }
            return false;
        }

        $scope.clearCompleted = function() {

            var r = [];
            //清空已经完成的 找到所有未完成的
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {

                    r.push($scope.todos[i]);
                }
            }
            $scope.todos = r;
        }


        //1.切换状态,使用 ng-click 方式,此种方式页面的链接无法记录状态
        /*
        $scope.active = function() {
            //通过过滤器切换状态
            $scope.search = { completed: false };
        }
        $scope.all = function() {
            $scope.search = {};
        }
        $scope.completed = function() {
            $scope.search = { completed: true };
        }
        */


        //2.切换状态,使用监听锚点变化的方式,此种方式通过不同的锚地值能够定位到不同的内容
        //$watch只能监听$scope 上的数据,先把$location设置到$scope 上,再监听
        /*
        $scope.location = $location;

        //当location的 path值变化的时候,会调用第二个参数方法
        $scope.$watch('location.path()', function() {
            switch ($location.path()) {
                case '/active':
                    $scope.search = { completed: false }
                    break;
                case '/completed':
                    $scope.search = { completed: true }
                    break;
                default:
                    $scope.search = {};
                    break;
            }
        });
        */

        //路由
        $scope.status = $routeParams.status || '';
        switch ($routeParams.status) {
            case 'active':
                $scope.search = { completed: false }
                break;
            case 'completed':
                $scope.search = { completed: true }
                break;
            default:
                $scope.search = {};
                $scope.status = '';
                break;
        }

        //切换路由时,控制器会被刷新
        console.log('刷新')

    }])
    //配置路由
    todoApp.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
        when('/',{
            templateUrl:'todo.html',
            controller:'MainController'
        }).
        when('/:status',{
            templateUrl:'todo.html',
            controller:'MainController'
        }).
        otherwise({
            redirectTo:'/'
        })
    }])

})(window);
