$(function(){
    new NameCreator({
        $inputElement:$('.js-clothing-name'),
        templates:['template3','template2',{
            templateName:'template1',
            title:'通用模板一'
        }]
    });
});