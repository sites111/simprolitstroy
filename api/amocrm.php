<?php 
	header('Content-Type: application/json; charset=utf-8');
	$data = json_decode(file_get_contents('php://input'), true);

/////////////////////////// Конфиг ///////////////////////////

	$contact_name = $data['name']; 									//Название добавляемого контакта
	$contact_phone = $data['phone']; 								//Телефон контакта
	$contact_email = $data['email']; 								//Емейл контакта 
	$contact_comment = $data['comment']; 							//способ коммуникации

	$contact_name = 'Тест';
	$contact_phone = '+00000000000';
	$contact_email = 'test@test.ru';
	$contact_comment = 'Текст примечания';

	$contact_attachement = 'https://simprolitstroy.ru/api/downloads/malevich.png';
	$contact_comment .= '

	Прикрепленный файл: '.$contact_attachement;

	$user=array(
		'USER_LOGIN'=>'artemamocrm@rambler.ru', 					#Ваш логин (электронная почта)
		'USER_HASH'=>'9fc180ec3859046755e749ab83c53fd62d3e7e06' 	#Хэш для доступа к API (смотрите в профиле пользователя)
	);
	$subdomain='simprolit';
	$pipeline_id = 5272561; 			// ID воронки
	$status_id = 47024881; 				// ID стадии
	$lead_name = 'Заявка из сайта';		// Название сделки

/////////////////////////// Ниже ничего не трогать ///////////////////////////
	$link='https://'.$subdomain.'.amocrm.ru/private/api/auth.php?type=json';
	$curl=curl_init(); 
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_POST,true);
	curl_setopt($curl,CURLOPT_POSTFIELDS,http_build_query($user));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	$out=curl_exec($curl); 
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE); 
	curl_close($curl); 
	$Response=json_decode($out,true); 
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/accounts/current'; 
	$curl=curl_init(); 
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	$out=curl_exec($curl); 
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	$Response=json_decode($out,true);
	$account=$Response['response']['account']; 
	$amoAllFields = $account['custom_fields']; //Все поля
	$amoConactsFields = $account['custom_fields']['contacts']; //Поля контактов 
	$sFields = array_flip(array(
			'PHONE', //Телефон. Варианты: WORK, WORKDD, MOB, FAX, HOME, OTHER
			'EMAIL' //Email. Варианты: WORK, PRIV, OTHER
		)
	); 
	foreach($amoConactsFields as $afield) {
		if(isset($sFields[$afield['code']])) {
			$sFields[$afield['code']] = $afield['id'];
		}
	}
	//Создаём заявку
	$data = array(
	    'add' => array(
	        0 => array(  
	            'pipeline_id' => $pipeline_id,
	            'created_at' => time(),
	            'incoming_entities' => array(
	                'leads' => array(
	                    0 => array(
	                        'name' => $lead_name,
	                        'created_at' => time(),
	                        'status_id' => $status_id,
	                        'price' => '0',
	                  //      'tags' => 'ТО, услуги'
	                        'notes'=> array(
	                        	0 => array(
									'note_type'=> "4", 
									'element_type'=> "lead", 
									'text'=> $contact_comment
								)
							),
	                        'custom_fields' => array(
								array(
									'id' => 0, 
									'values' => array(
										array('value' => 0)
										
										//	"403751": "Позвонить",
										//	"403753": "WhatsApp",
										//	"403755": "Telegram"
				                		
									)
								)
							),
	                    ),
	                ),
	                'contacts' => array(
	                    0 => array(
	                        'name' => $contact_name,
	                        'custom_fields' => array(
	                            0 => array(
	                                'id' => $sFields['PHONE'],
	                                'values' => array(
	                                    0 => array(
	                                        'value' => $contact_phone,
	                                        'enum' => 'WORK',
	                                    ),
	                                ),
	                            ),
	                            1 => array(
	                                'id' => $sFields['EMAIL'],
	                                'values' => array(
	                                    0 => array(
	                                        'value' => $contact_email,
	                                        'enum' => 'WORK',
	                                    ),
	                                ),
	                            ),
	                        ), 
	                    ),
	                ),/*
	                'companies' => array(
	                    0 => array(
	                        'name' => 'Company'
	                    )
	                ), */
	            ),
	            'incoming_lead_info' => array(
					'form_id' => '159783',
			        'form_page' => 'Интеграция с сайтом',
			        'ip' => '127.0.0.1',
			        'service_code' => 'QkKwSam8',
			        'form_name' => 'Leave a request',
			        'form_send_at' => '1509483600',
			        'referer' => 'http://example.com/index.php?ref=103719'
	            ),
	        ),
	    ),
	); 
	$link = 'https://'.$subdomain.'.amocrm.ru/api/v2/incoming_leads/form?api_key='.$user['USER_LOGIN'].'&login='.$user['USER_HASH']; 
	$curl = curl_init(); 
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_POST,true);
	curl_setopt($curl,CURLOPT_POSTFIELDS, http_build_query($data));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); 
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	$out = curl_exec($curl);  

	$result = json_decode($out,true);
 
	echo $out; 
?>