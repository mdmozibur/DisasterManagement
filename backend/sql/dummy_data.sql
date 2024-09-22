INSERT INTO public.users (created_at,"name",phone,"password",is_admin,"session",is_verified) VALUES
	 ('2024-09-21 13:22:49.573814','Turhaan','01626123456','$2b$10$6orDgCm3KYsl79f9ND.OqOrPztst7D8lbJebPaVT49cgpFzaODi6O',false,NULL,true),
	 ('2024-09-20 10:56:49.829412','Anika Anjum','01787804488','$2b$10$WKGV0kPE6DiBqmPfNjB45O95E/BGUc.BZeg2IVd9WXUGDP9pfpivK',false,NULL,true),
	 ('2024-09-22 04:13:10.082612','Baraka','01818793262','$2b$10$SH9a1AFO2PJ5xkRIHcnvoe2A54Nbm9ZVjUO.A/pmrt0pPmEsmKY3O',false,NULL,false),
	 ('2024-09-20 10:52:05.670488','mozib','01818793261','$2b$10$iLIzfS4PdEUYLoveB0PKVuupvl/CxIjge05OdmibxobS44gFB.hKy',true,'1665b735-9078-4224-ac9e-e9924b470b1a',true);

INSERT INTO public.crisisreports (created_at,"location","severity","name",incident,user_id,is_resolved) VALUES
	 ('2024-09-18 08:17:17.399797','Palisara','moderate'::public."severity",NULL,'Flood affected people are starving for food',2,false),
	 ('2024-09-18 11:58:27.783917','Dohar, nababganj','critical'::public."severity",NULL,'Fire broke out on several houses at Barra village',3,false),
	 ('2024-09-18 08:17:50.480498','Bakila, Chandpur','critical'::public."severity",NULL,'Cholera outbreak',3,false),
	 ('2024-09-18 07:56:21.197669','Chandpur','low'::public."severity",NULL,'Devastating flood has caused the area to be submerged',NULL,false);

INSERT INTO public.donations (created_at,amount,donor_name,donor_address) VALUES
	 ('2024-09-19 05:21:26.04945',100,'happy','hajiganj, chandpur'),
	 ('2024-09-19 05:22:46.502174',344.8,'turhaan','palisara, hajiganj'),
	 ('2024-09-18 05:22:46.502',200,'helen','bakila, chandpur'),
	 ('2024-09-19 05:47:16.645878',1000,'Baraka','Shahinbag, Dhaka'),
	 ('2024-09-19 05:52:40.618535',150,'Helen','Bichanakandi, Sylhet'),
	 ('2024-09-19 05:56:32.98699',660,'Alamgir Mia','Dakshin Sreepur, Digoi'),
	 ('2024-09-17 05:22:46.502',800,'Samsun Naher','Maramura, Bolakhal'),
	 ('2024-09-18 05:22:46.502',550,'Unknown','Unknown');

INSERT INTO public.inventory (created_at,product_name,available_qantity,unit_price) VALUES
	 ('2024-09-22 19:40:30.09986','MUM Water 1 Liter',200,30),
	 ('2024-09-22 19:40:30.07311','Puffed Rice',25,100),
	 ('2024-09-22 19:40:30.094834','Flattened Rice',110,60);

INSERT INTO public.purchase_orders (created_at,inventory_id,quantity) VALUES
	 ('2024-09-22 14:26:31.146575',1,5),
	 ('2024-09-22 14:26:47.095176',2,10);
