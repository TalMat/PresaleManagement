function shipment(){
    return `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">` +
        emailHead +
        emailBody("GREAT NEWS!", "Your shirt is on its way!") +
        `</html>`;
}

function confirmation(){
    return `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">` +
        emailHead +
        emailBody("You've done GREAT!", "Your shirt will ship in two weeks!") +
        `</html>`;
}

function emailBody(msgA, msgB){
    return `
    <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
            <tr>
                <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    
                        <tr>
                            <td align="center" valign="top" id="templateHeader" data-template-container style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding:0">
    
                                <!--[if gte mso 9]>
                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                <tr>
                                <td align="center" valign="top" width="600" style="width:600px;">
                                <![endif]-->
    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                    <tr>
                                        <td valign="top" class="headerContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <tbody class="mcnImageBlockOuter">
                                            <tr>
                                                <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                        <tbody><tr>
                                                            <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                <img align="center" src="https://gallery.mailchimp.com/ca7e58ebe2d4a5a54bcd52e69/images/23e51ee0-90b8-4fe0-bccb-ef6a8761fa85.png" width="564" style="max-width: 586px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                </table>
    
                                <!--[if gte mso 9]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
    
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" id="templateBody" data-template-container style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #00ae58;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 43px;padding-bottom: 43px;">
    
                                <!--[if gte mso 9]>
                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                <tr>
                                <td align="center" valign="top" width="600" style="width:600px;">
                                <![endif]-->
    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                    <tr>
                                        <td valign="top" class="bodyContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                                    <tr>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
    
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;line-height: 125%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #808080;font-family: Helvetica;font-size: 16px;text-align: left;">
                                                                <h4 style="display: block;margin: 0;padding: 0;color: #999999;font-family: Georgia;font-size: 20px;font-style: italic;font-weight: normal;line-height: 125%;letter-spacing: normal;text-align: center;"><span style="color:#00AE58">${msgA}</span></h4>
                                                                <h1 style="display: block;margin: 0;padding: 0;color: #222222;font-family: Helvetica;font-size: 40px;font-style: normal;font-weight: bold;line-height: 150%;letter-spacing: normal;text-align: center;"><font color="#00ae58"><span style="font-size:35px">${msgB}</span></font></h1>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if mso]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
    
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>` +
                                        // <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        //     <tbody class="mcnImageBlockOuter">
                                        //     <tr>
                                        //         <td valign="top" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                                        //             <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        //                 <tbody>
                                        //                 <tr>
                                        //                     <td class="mcnImageContent" valign="top" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        //                         <img align="center" src="https://gallery.mailchimp.com/ca7e58ebe2d4a5a54bcd52e69/images/ac30681e-1e2e-4f55-b87e-127adbc09596.jpg" width="600" style="max-width: 800px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                        //                     </td>
                                        //                 </tr>
                                        //                 </tbody>
                                        //             </table>
                                        //         </td>
                                        //     </tr>
                                        //     </tbody>
                                        // </table>
                                        `<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                                    <tr>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
    
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;line-height: 125%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #808080;font-family: Helvetica;font-size: 16px;text-align: left;">
                                                                <p style="text-align: center;line-height: 125%;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #808080;font-family: Helvetica;font-size: 16px;">If you have any questions or concerns please contact us:</p>
                                                                <p style="text-align: center;line-height: 125%;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #808080;font-family: Helvetica;font-size: 16px;">Phone • (877) 305-4146<br>
                                                                    Email • customerservice@qspgao.com</p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if mso]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
    
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                </table>
    
                                <!--[if gte mso 9]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
    
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" id="templateFooter" data-template-container style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #333333;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 10px;padding-bottom: 10px;">
    
                                <!--[if gte mso 9]>
                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                <tr>
                                <td align="center" valign="top" width="600" style="width:600px;">
                                <![endif]-->
    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                    <tr>
                                        <td valign="top" class="footerContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                                    <tr>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
    
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #FFFFFF;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;">
                                                                    <em>Copyright 2018, Noble Wear Ltd. All rights reserved.</em><br>
                                                                    110 Wall Street South, Onamia Minnesota 56359<br>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if mso]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
    
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                </table>
    
                                <!--[if gte mso 9]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
    
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
    </body>`
}

let emailHead = `
    <head>
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>
        <style type="text/css">
            p{
                margin:10px 0;
                padding:0;
            }
            table{
                border-collapse:collapse;
            }
            h1,h2,h3,h4,h5,h6{
                display:block;
                margin:0;
                padding:0;
            }
            img,a img{
                border:0;
                height:auto;
                outline:none;
                text-decoration:none;
            }
            body,#bodyTable,#bodyCell{
                height:100%;
                margin:0;
                padding:0;
                width:100%;
            }
            #outlook a{
                padding:0;
            }
            img{
                -ms-interpolation-mode:bicubic;
            }
            table{
                mso-table-lspace:0pt;
                mso-table-rspace:0pt;
            }
            .ReadMsgBody{
                width:100%;
            }
            .ExternalClass{
                width:100%;
            }
            p,a,li,td,blockquote{
                mso-line-height-rule:exactly;
            }
            a[href^=tel],a[href^=sms]{
                color:inherit;
                cursor:default;
                text-decoration:none;
            }
            p,a,li,td,body,table,blockquote{
                -ms-text-size-adjust:100%;
                -webkit-text-size-adjust:100%;
            }
            .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                line-height:100%;
            }
            a[x-apple-data-detectors]{
                color:inherit !important;
                text-decoration:none !important;
                font-size:inherit !important;
                font-family:inherit !important;
                font-weight:inherit !important;
                line-height:inherit !important;
            }
            .templateContainer{
                max-width:600px !important;
            }
            a.mcnButton{
                display:block;
            }
            .mcnImage{
                vertical-align:bottom;
            }
            .mcnTextContent{
                word-break:break-word;
            }
            .mcnTextContent img{
                height:auto !important;
            }
            .mcnDividerBlock{
                table-layout:fixed !important;
            }
            h1{
                color:#222222;
                font-family:Helvetica;
                font-size:40px;
                font-style:normal;
                font-weight:bold;
                line-height:150%;
                letter-spacing:normal;
                text-align:center;
            }
            h2{
                color:#222222;
                font-family:Helvetica;
                font-size:34px;
                font-style:normal;
                font-weight:bold;
                line-height:150%;
                letter-spacing:normal;
                text-align:left;
            }
            h3{
                color:#444444;
                font-family:Helvetica;
                font-size:22px;
                font-style:normal;
                font-weight:bold;
                line-height:150%;
                letter-spacing:normal;
                text-align:left;
            }
            h4{
                color:#999999;
                font-family:Georgia;
                font-size:20px;
                font-style:italic;
                font-weight:normal;
                line-height:125%;
                letter-spacing:normal;
                text-align:center;
            }
            #templateHeader{
                background-color:#ffffff;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:54px;
                padding-bottom:54px;
            }
            .headerContainer{
                background-color:transparent;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:0;
                padding-bottom:0;
            }
            .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                color:#808080;
                font-family:Helvetica;
                font-size:16px;
                line-height:150%;
                text-align:left;
            }
            .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
                color:#00ADD8;
                font-weight:normal;
                text-decoration:underline;
            }
            #templateBody{
                background-color:#00ae58;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:43px;
                padding-bottom:43px;
            }
            .bodyContainer{
                background-color:#ffffff;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:0;
                padding-bottom:0;
            }
            .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                color:#808080;
                font-family:Helvetica;
                font-size:16px;
                line-height:150%;
                text-align:left;
            }
            .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
                color:#00ADD8;
                font-weight:normal;
                text-decoration:underline;
            }
            #templateFooter{
                background-color:#333333;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:45px;
                padding-bottom:63px;
            }
            .footerContainer{
                background-color:transparent;
                background-image:none;
                background-repeat:no-repeat;
                background-position:center;
                background-size:cover;
                border-top:0;
                border-bottom:0;
                padding-top:0;
                padding-bottom:0;
            }
            .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                color:#FFFFFF;
                font-family:Helvetica;
                font-size:12px;
                line-height:150%;
                text-align:center;
            }
            .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
                color:#FFFFFF;
                font-weight:normal;
                text-decoration:underline;
            }
    
            @media only screen and (min-width:768px){
                .templateContainer{
                    width:600px !important;
                }
                body,table,td,p,a,li,blockquote{
                    -webkit-text-size-adjust:none !important;
                }
                body{
                    width:100% !important;
                    min-width:100% !important;
                }
                .mcnImage{
                    width:100% !important;
                }
                .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                    max-width:100% !important;
                    width:100% !important;
                }
                .mcnBoxedTextContentContainer{
                    min-width:100% !important;
                }
                .mcnImageGroupContent{
                    padding:9px !important;
                }
                .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                    padding-top:9px !important;
                }
                .mcnImageCardTopImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                    padding-top:18px !important;
                }
                .mcnImageCardBottomImageContent{
                    padding-bottom:9px !important;
                }
                .mcnImageGroupBlockInner{
                    padding-top:0 !important;
                    padding-bottom:0 !important;
                }
                .mcnImageGroupBlockOuter{
                    padding-top:9px !important;
                    padding-bottom:9px !important;
                }
                .mcnTextContent,.mcnBoxedTextContentColumn{
                    padding-right:18px !important;
                    padding-left:18px !important;
                }
                .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                    padding-right:18px !important;
                    padding-bottom:0 !important;
                    padding-left:18px !important;
                }
                .mcpreview-image-uploader{
                    display:none !important;
                    width:100% !important;
                }
                h1{
                    font-size:30px !important;
                    line-height:125% !important;
                }
                h2{
                    font-size:26px !important;
                    line-height:125% !important;
                }
                h3{
                    font-size:20px !important;
                    line-height:150% !important;
                }
                h4{
                    font-size:18px !important;
                    line-height:150% !important;
                }
                .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                    font-size:14px !important;
                    line-height:150% !important;
                }
                .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                    font-size:16px !important;
                    line-height:150% !important;
                }
                .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                    font-size:16px !important;
                    line-height:150% !important;
                }
                .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                    font-size:14px !important;
                    line-height:150% !important;
                }
            }
        </style>
    </head>
    `;

module.exports = {
    confirmation,
    shipment
};