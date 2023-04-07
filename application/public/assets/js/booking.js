$(document).on('change','.priceTabs',function(){
    if($(this).hasClass('active')){
        let priceType = $(this).attr('data-cartype')
        let tabType = $(this).attr('data-type')
        let carType = priceType.split('_')
            carType = carType[0] 
        if(tabType==='custom'){
            $('#customFinalPrice').text('0.00')
            $('.'+priceType).siblings('.price').hide()
            $('.'+priceType).show()
            $('.'+priceType).each(function(){
                var price = $(this).attr('data-price')
                var gst = $(this).attr('data-gst')
                var finalPrice = $(this).attr('data-final-price')
                $(this).parent('p').siblings('.subservicePrice').val(price)
                $(this).parent('p').siblings('.subserviceGST').val(gst)
                $(this).parent('p').siblings('.subserviceFullPrice').val(finalPrice)
            })
            $('.'+tabType+'_button').attr('data-car-type',carType)

        }else{
            $('.'+priceType).siblings('.price').hide()
            $('.'+priceType).show()
            $('.'+priceType).each(function(){
                var price = $(this).attr('data-price')
                var gst = $(this).attr('data-gst')
                var finalPrice = $(this).attr('data-final-price')
                $(this).parent('h2').siblings('.'+tabType+'_button').attr('data-price',price)
                $(this).parent('h2').siblings('.'+tabType+'_button').attr('data-gst',gst)
                $(this).parent('h2').siblings('.'+tabType+'_button').attr('data-final-price',finalPrice)
                $(this).parent('h2').siblings('.'+tabType+'_button').attr('data-car-type',carType)
            })
        }
    }
})
$(document).on('change','.form-check-input',function(){
    let subServiceId        = ''
    let title               = ''
    let price               = 0
    let totalPrice          = 0
    let GST                 = 0
    let totalGST            = 0
    let fullPrice           = 0
    let totalFullPrice      = 0
    let customPackageArr    = {}
    let tempArr             = []
    $(".form-check-input").each(function(){
        if ($(this).prop('checked')){ 
            subServiceId = $(this).val()
            price        = $('input[name="price['+subServiceId+']"]').val()
            totalPrice   +=parseFloat(price)
            GST          = $('input[name="gst['+subServiceId+']"]').val()

            totalGST     +=parseFloat(price)*(parseFloat(GST)/100)
            fullPrice    = $('input[name="full_price['+subServiceId+']"]').val()
            title        = $('input[name="title['+subServiceId+']"]').val()
            totalFullPrice+=parseFloat(fullPrice)
            tempArr.push({
                        subserviceId : subServiceId,
                        title        : title,
                        price        : price,
                        GST          : GST,
                        fullPrice    : fullPrice
                    })
        }
    })
    customPackageArr.items=tempArr
    customPackageArr.total={
            totalPrice      : totalPrice,
            totalGST        : totalGST,
            totalFullPrice  : totalFullPrice
        }
    customPackageArr.carType        = $('.custom_button').attr('data-car-type')
    customPackageArr.providerId     = $('.custom_button').attr('data-provider-id')
    customPackageArr.paymentType    = 'onetime'
    let data                = JSON.stringify(customPackageArr)
    localStorage.setItem('customPackage',data)
    $('#customFinalPrice').text(parseFloat(totalFullPrice).toFixed(2))
    $('.custom-display').show()
})
$(document).on('click','.cartypeclass',function(event){
    let tabId = $(this).attr('tab-id')
    if($('.form-check-input:checked').length){
        Swal.fire({
        title: 'Do you want to proceed?',
        text: "If you switch car type , your previous price will be overriden!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                $('.form-check-input').prop('checked', false)
                $('.bttnsTabs'+tabId).children().removeClass('active')
                event.target.classList.toggle('active')
                $('.bttnsTabs'+tabId).children(".priceTabs.active").trigger('change')
            }
        })
    }else{
        $('.bttnsTabs'+tabId).children().removeClass('active')
        event.target.classList.toggle('active')
        $('.bttnsTabs'+tabId).children(".priceTabs.active").trigger('change')
    }
})
$(document).ready(function () {
    let activetab = window.location.href
    let activeTabArr = activetab.split('#')
    if(activeTabArr.length>1){
        $('.nav-tabs a').removeClass('active')
        $('a[href="#'+activeTabArr[1]+'"]').addClass('active')
        $('.tab-content .tab-pane').removeClass('active')
        $('#'+activeTabArr[1]).addClass('active')
    }
    $(".nav-tabs a").click(function () {
        $(this).tab("show")
    })
})
$(document).on('click','.bookbutton',function(){
    if(token==''){
        let lastgement = window.location.href.split("/").pop()
        let refurl = '/service-provider-details/'+lastgement
        let url = '/login?referrer#'+btoa(refurl)
        swalAlertThenRedirect('Please Log In !','warning',url, showCancelButton = false)
    }else{
        if($(this).hasClass('custom_button')){
            localStorage.removeItem('regularPackage')
            if(localStorage.getItem('customPackage')==null){
                swalAlert('Please choose on the service!','warning')
            }else{
                window.location.href="/checkout"
            }
        }else{
            localStorage.removeItem('customPackage')
            $('.form-check-input').prop('checked', false)
            let providerId          = $(this).attr('data-provider-id')
            let packageName         = $(this).attr('data-package-name')
            let serviceNames        = $(this).attr('data-service-names')
            let packageId           = $(this).attr('data-package-id')
            let totalPrice          = $(this).attr('data-price')
            let GST                 = $(this).attr('data-gst')
            let totalGST            = parseFloat(totalPrice)*(parseFloat(GST)/100)
            let totalFullPrice      = $(this).attr('data-final-price')
            let carType             = $(this).attr('data-car-type')
            let paymentType         = $(this).attr('data-payment-type')
            let data = {
                providerId,
                packageName,
                serviceNames,
                packageId,
                totalPrice,
                totalGST,
                totalFullPrice,
                carType,
                paymentType
            }
            localStorage.setItem('regularPackage',JSON.stringify(data))
            window.location.href="/checkout"

        }
    }
})
