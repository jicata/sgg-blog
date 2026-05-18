-- Seed data for new configuration tables

-- Seed data for VendorConfigurations table
-- Insert Experian vendor configuration
INSERT INTO VendorConfigurations (Id,
                                  VendorType,
                                  ConfigurationType,
                                  CreatedOn)
VALUES ('11111111-1111-1111-1111-111111111111',
        'Experian',
        'Consumer',
        CURRENT_TIMESTAMP);

-- Insert Equifax vendor configuration
INSERT INTO VendorConfigurations (Id,
                                  VendorType,
                                  ConfigurationType,
                                  CreatedOn)
VALUES ('22222222-2222-2222-2222-222222222222',
        'Equifax',
        'Consumer',
        CURRENT_TIMESTAMP);

-- Insert Experian Business API vendor configuration
INSERT INTO VendorConfigurations (Id,
                                  VendorType,
                                  ConfigurationType,
                                  CreatedOn)
VALUES ('33333333-3333-3333-3333-333333333333',
        'Experian',
        'Commercial',
        CURRENT_TIMESTAMP);

-- Seed data for VendorEnvironments table
INSERT INTO VendorEnvironments (Id,
                                VendorEnvironmentType,
                                BaseUrl,
                                VendorConfigurationId,
                                CreatedOn)
VALUES ('a1e2f3c4-1111-2222-3333-444455556666',
        'UAT',
        'https://uat-us-api.experian.com',
        '11111111-1111-1111-1111-111111111111',
        CURRENT_TIMESTAMP);

INSERT INTO VendorEnvironments (Id,
                                VendorEnvironmentType,
                                BaseUrl,
                                VendorConfigurationId,
                                CreatedOn)
VALUES ('b2f3c4d5-2222-3333-4444-555566667777',
        'UAT',
        'https://api.uat.equifax.com',
        '22222222-2222-2222-2222-222222222222',
        CURRENT_TIMESTAMP);

INSERT INTO VendorEnvironments (Id,
                                VendorEnvironmentType,
                                BaseUrl,
                                VendorConfigurationId,
                                CreatedOn)
VALUES ('c3d4e5f6-3333-4444-5555-666677778888',
        'UAT',
        'https://uat-us-api.experian.com',
        '33333333-3333-3333-3333-333333333333',
        CURRENT_TIMESTAMP);

-- Seed data for VendorProducts table
-- Insert Experian Consumer Credit Profile products
INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('44444444-4444-4444-4444-444444444444',
        'CreditReport',
        'Hard',
        'consumerservices/credit-profile/v2/credit-report',
        '11111111-1111-1111-1111-111111111111',
        CURRENT_TIMESTAMP);

-- Insert Experian Prequal Credit Report product
INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('77777777-7777-7777-7777-777777777777',
        'PrequalCreditProfile',
        'Soft',
        'consumerservices/prequal/v1/credit-report',
        '11111111-1111-1111-1111-111111111111',
        CURRENT_TIMESTAMP);

-- Insert Equifax Consumer Credit Profile product
INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('88888888-8888-8888-8888-888888888888',
        'ConsumerCreditProfile',
        'Hard',
        'business/oneview/consumer-credit/v1/reports/credit-report',
        '22222222-2222-2222-2222-222222222222',
        CURRENT_TIMESTAMP);

-- Insert Experian Business API products
INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('99999999-9999-9999-9999-999999999999',
        'PremierProfilesPdf',
        'Hard',
        '/businessinformation/businesses/v1/reports/premierprofiles/pdf',
        '33333333-3333-3333-3333-333333333333',
        CURRENT_TIMESTAMP);

INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('3c414395-139e-46fc-bbf5-f1441d5c2c71',
        'IntelliscorePlus',
        'Hard',
        '/businessinformation/businesses/v1/reports/intelliscoreplus',
        '33333333-3333-3333-3333-333333333333',
        CURRENT_TIMESTAMP);

INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('bd99ad60-44d5-4086-845e-a2d4bede10a2',
        'IntelliscorePlusPdf',
        'Hard',
        '/businessinformation/businesses/v1/reports/intelliscoreplus/pdf',
        '33333333-3333-3333-3333-333333333333',
        CURRENT_TIMESTAMP);

INSERT INTO VendorProducts (Id,
                            ProductName,
                            PullType,
                            EndpointUri,
                            VendorConfigurationId,
                            CreatedOn)
VALUES ('ad40fb69-88d3-4e69-86b0-f26ea7fcfc54',
        'PremierProfiles',
        'Hard',
        '/businessinformation/businesses/v1/reports/premierprofiles',
        '33333333-3333-3333-3333-333333333333',
        CURRENT_TIMESTAMP);

-- Seed data for VendorProductSpecificConfigurations table
-- Insert VendorConsumerCreditProfileProductConfiguration for Equifax ConsumerCreditProfile product
INSERT INTO VendorProductSpecificConfigurations (
    Id,
    VendorProductId,
    ProductName,
    CreatePdfReport,
    CreatedOn)
VALUES (
           '66666666-6666-6666-6666-666666666666',
           '88888888-8888-8888-8888-888888888888',
           'ConsumerCreditProfile',
           FALSE,
           CURRENT_TIMESTAMP
       );

-- Seed data for VendorPermissiblePurposes table
-- Experian Consumer permissible purposes
INSERT INTO VendorPermissiblePurposes (Id, VendorConfigurationId, Code, Description, CreatedOn)
VALUES
    ('e1111111-1111-1111-1111-111111111100', '11111111-1111-1111-1111-111111111111', '00', 'Auto Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111111', '01', 'Unsecured Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111111', '02', 'Secured Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111103', '11111111-1111-1111-1111-111111111111', '03', 'Partially Secured Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111104', '11111111-1111-1111-1111-111111111111', '04', 'Home Improvement Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111105', '11111111-1111-1111-1111-111111111111', '05', 'FHA Home Improvement Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111106', '11111111-1111-1111-1111-111111111111', '06', 'Installment Sales Contract', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111107', '11111111-1111-1111-1111-111111111111', '07', 'Charge Account', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111108', '11111111-1111-1111-1111-111111111111', '08', 'Real Estate Specific Type Unknown', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111109', '11111111-1111-1111-1111-111111111111', '09', 'Loan Secured By Cosigner', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110a', '11111111-1111-1111-1111-111111111111', '0A', 'Time Share Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110b', '11111111-1111-1111-1111-111111111111', '0C', 'Debt Buyer', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110c', '11111111-1111-1111-1111-111111111111', '0F', 'Construction Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110d', '11111111-1111-1111-1111-111111111111', '0G', 'Flexible Spending Credit Card', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110e', '11111111-1111-1111-1111-111111111111', '10', 'Commercial Transaction With Personal Liability, Guarantee Or Written Instruction', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111110f', '11111111-1111-1111-1111-111111111111', '11', 'Recreational Merchandise', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111110', '11111111-1111-1111-1111-111111111111', '12', 'Education Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '13', 'Lease', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', '14', 'Cosigner (Not Borrower)', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', '15', 'Check Credit Or Line Of Credit', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', '16', 'FHA Cosigner (Not Borrower)', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111111', '17', 'Manufactured Home', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111118', '11111111-1111-1111-1111-111111111111', '18', 'Credit Card', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111116', '11111111-1111-1111-1111-111111111111', '19', 'FHA Real Estate Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111117', '11111111-1111-1111-1111-111111111111', '1A', 'Lender-Placed Insurance', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111119', '11111111-1111-1111-1111-111111111111', '1B', 'Legitimate Business Purpose', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111a', '11111111-1111-1111-1111-111111111111', '1C', 'Purchase Of Household Goods', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111b', '11111111-1111-1111-1111-111111111111', '20', 'Note Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111c', '11111111-1111-1111-1111-111111111111', '21', 'Note Loan With Cosigner', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111d', '11111111-1111-1111-1111-111111111111', '22', 'Secured By Household Goods', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111e', '11111111-1111-1111-1111-111111111111', '23', 'Secured By Household Goods & Other Collateral', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111111f', '11111111-1111-1111-1111-111111111111', '25', 'VA Real Estate Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111120', '11111111-1111-1111-1111-111111111111', '26', 'Conventional Real Estate Loan, Including Purchase Money First', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111121', '11111111-1111-1111-1111-111111111111', '27', 'Real Estate Mortgage - With Or Without Other Collateral. Usually A Second Mortgage', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111122', '11111111-1111-1111-1111-111111111111', '29', 'Rental', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111123', '11111111-1111-1111-1111-111111111111', '2A', 'Secured Credit Card', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111124', '11111111-1111-1111-1111-111111111111', '2C', 'Farmer’s Home Administration (FMHA)', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111125', '11111111-1111-1111-1111-111111111111', '30', 'Summary Of Accounts With Same Status', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111126', '11111111-1111-1111-1111-111111111111', '31', 'Unknown - Credit Extension, Review, Or Collection', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111127', '11111111-1111-1111-1111-111111111111', '33', 'Manual Mortgage', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111128', '11111111-1111-1111-1111-111111111111', '37', 'Combined Credit Plan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111129', '11111111-1111-1111-1111-111111111111', '3A', 'Auto Lease', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112a', '11111111-1111-1111-1111-111111111111', '3C', 'Licensing - CA And NV Legal Requirement', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112b', '11111111-1111-1111-1111-111111111111', '43', 'Debit Card', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112c', '11111111-1111-1111-1111-111111111111', '47', 'Credit Line Secured', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112d', '11111111-1111-1111-1111-111111111111', '48', 'Collection Department / Agency / Attorney', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112e', '11111111-1111-1111-1111-111111111111', '4D', 'Telecommunications / Cellular', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111112f', '11111111-1111-1111-1111-111111111111', '4F', 'Tax Collection', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111130', '11111111-1111-1111-1111-111111111111', '50', 'Family Support', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111131', '11111111-1111-1111-1111-111111111111', '5A', 'Real Estate - Jr Liens / Non-Purchase Money', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111132', '11111111-1111-1111-1111-111111111111', '5B', 'Second Mortgage', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111133', '11111111-1111-1111-1111-111111111111', '5C', 'Checking Or Savings / Possible Additional Offers', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111134', '11111111-1111-1111-1111-111111111111', '65', 'Government Unsecured Guaranteed Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111135', '11111111-1111-1111-1111-111111111111', '66', 'Government Secured Guaranteed Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111136', '11111111-1111-1111-1111-111111111111', '67', 'Government Unsecured Direct Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111137', '11111111-1111-1111-1111-111111111111', '68', 'Government Secured Direct Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111138', '11111111-1111-1111-1111-111111111111', '69', 'Government Grant', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111139', '11111111-1111-1111-1111-111111111111', '6A', 'Commercial Installment Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113a', '11111111-1111-1111-1111-111111111111', '6B', 'Commercial Mortgage', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113b', '11111111-1111-1111-1111-111111111111', '6C', 'Credit Granting / Possible Additional Offers', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113c', '11111111-1111-1111-1111-111111111111', '6D', 'Home Equity', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113d', '11111111-1111-1111-1111-111111111111', '70', 'Government Overpayment', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113e', '11111111-1111-1111-1111-111111111111', '71', 'Government Fine', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111113f', '11111111-1111-1111-1111-111111111111', '72', 'Government Fee For Service', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111140', '11111111-1111-1111-1111-111111111111', '73', 'Government Employee Advance', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111141', '11111111-1111-1111-1111-111111111111', '74', 'Government Miscellaneous Debt', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111142', '11111111-1111-1111-1111-111111111111', '77', 'Returned Check', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111143', '11111111-1111-1111-1111-111111111111', '78', 'Installment Loan', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111144', '11111111-1111-1111-1111-111111111111', '7A', 'Commercial Line Of Credit', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111145', '11111111-1111-1111-1111-111111111111', '7B', 'Agriculture', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111146', '11111111-1111-1111-1111-111111111111', '7C', 'Service Activation / Possible Additional Offers', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111147', '11111111-1111-1111-1111-111111111111', '83', 'Post Prescreen/Extract Prescreen Inquiry', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111148', '11111111-1111-1111-1111-111111111111', '85', 'Bi-Monthly Mortgage Payment', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111149', '11111111-1111-1111-1111-111111111111', '86', 'Automated Mortgage Report', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114a', '11111111-1111-1111-1111-111111111111', '87', 'Semi-Monthly Mortgage Payment', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114b', '11111111-1111-1111-1111-111111111111', '89', 'Home Equity Line Of Credit', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114c', '11111111-1111-1111-1111-111111111111', '8A', 'Business Credit Card', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114d', '11111111-1111-1111-1111-111111111111', '8B', 'Deposit Related', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114e', '11111111-1111-1111-1111-111111111111', '8C', 'ID Profile', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-11111111114f', '11111111-1111-1111-1111-111111111111', '90', 'Medical Debt', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111150', '11111111-1111-1111-1111-111111111111', '91', 'Debt Consolidation', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111151', '11111111-1111-1111-1111-111111111111', '92', 'Utility Company', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111152', '11111111-1111-1111-1111-111111111111', '93', 'Child Support', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111153', '11111111-1111-1111-1111-111111111111', '94', 'Spouse Support', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111154', '11111111-1111-1111-1111-111111111111', '95', 'Attorney Fees', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111155', '11111111-1111-1111-1111-111111111111', '96', 'Checking Account', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111156', '11111111-1111-1111-1111-111111111111', '98', 'Credit Granting', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111157', '11111111-1111-1111-1111-111111111111', '9A', 'Secured Home Improvement', CURRENT_TIMESTAMP),
    ('e1111111-1111-1111-1111-111111111158', '11111111-1111-1111-1111-111111111111', '9B', 'Business Line - Personally Guaranteed', CURRENT_TIMESTAMP);

-- Equifax Consumer permissible purposes
INSERT INTO VendorPermissiblePurposes (Id, VendorConfigurationId, Code, Description, CreatedOn)
VALUES
    ('e2222222-2222-2222-2222-222222222200', '22222222-2222-2222-2222-222222222222', '01', 'Intends to use the information as a potential investor servicer or current insurer in connection with a valuation of or assessment of the credit or prepayment risks.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222201', '22222222-2222-2222-2222-222222222222', '03', 'In accordance with written instructions of the consumer to whom it relates.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222202', '22222222-2222-2222-2222-222222222222', '04', 'In connection with a collection transaction involving a credit account of the consumer.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222203', '22222222-2222-2222-2222-222222222222', '05', 'In response to an agency administering a state plan under Section 454 of the Social Security Act (42 U.S.C. 654) for use to set an initial or modified child support award.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222204', '22222222-2222-2222-2222-222222222222', '06', 'In accordance with written instructions of the consumer through a reseller.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222205', '22222222-2222-2222-2222-222222222222', '07', 'In response to a request by the head of a state or local child support enforcement agency (or a state or local government official authorized by the head of such an agency) that has met all requirements of Section 604(a)(4)(ABCD).', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222208', '22222222-2222-2222-2222-222222222222', '08', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer. For use only when the transaction cannot be described with a more specific code.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222206', '22222222-2222-2222-2222-222222222222', '09', 'For employment purposes (Only PERSONA is available with this code).', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222207', '22222222-2222-2222-2222-222222222222', '10', 'In connection with a determination of eligibility for a license or other benefit granted by a governmental instrument required by law to consider financial responsibility or status.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222209', '22222222-2222-2222-2222-222222222222', '11', 'In connection with the underwriting of insurance.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220a', '22222222-2222-2222-2222-222222222222', '12', 'In connection with the review of existing policy holders for insurance underwriting purposes.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220b', '22222222-2222-2222-2222-222222222222', '13', 'A legitimate business need to review an account to determine whether the consumer continues to meet the terms of the account.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220c', '22222222-2222-2222-2222-222222222222', '14', 'In response to the order of a court having jurisdiction or a subpoena issued by a federal grand jury.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220d', '22222222-2222-2222-2222-222222222222', '15', 'In connection with a tenant screen application involving the consumer.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220e', '22222222-2222-2222-2222-222222222222', '16', 'For use by a governmental agency pursuant to FCRA Section 608.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222220f', '22222222-2222-2222-2222-222222222222', '17', 'To protect against or prevent actual or potential fraud unauthorized transactions claims or other liability.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222210', '22222222-2222-2222-2222-222222222222', '18', 'For required institutional risk control or for resolving consumer disputes or inquiries.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222211', '22222222-2222-2222-2222-222222222222', '19', 'Due to holding a legal or beneficial interest relating to the consumer.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222212', '22222222-2222-2222-2222-222222222222', '20', 'To law enforcement agencies or for an investigation on a matter related to public safety.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222213', '22222222-2222-2222-2222-222222222222', '21', 'As necessary to effect administer or enforce a transaction; to underwrite insurance at the consumer\'s request for reinsurance purposes or for the following purposes related to the consumer\'s insurance; account administration reporting investigating fraud prevention premium payment processing claim processing benefit administration or research projects.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222214', '22222222-2222-2222-2222-222222222222', '22', 'To persons acting in a fiduciary or representative capacity on behalf of and with the consent of the consumer.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222215', '22222222-2222-2222-2222-222222222222', '23', 'As necessary to effect administer or enforce a transaction requested or authorized by the consumer including location for collection of a delinquent account.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222216', '22222222-2222-2222-2222-222222222222', '24', 'In conjunction with access to a commercial file on a sole proprietorship.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222217', '22222222-2222-2222-2222-222222222222', '25', 'In conjunction with access to a commercial file on a corporation where specific consumer consent is given.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222218', '22222222-2222-2222-2222-222222222222', '26', 'In connection with a credit transaction involving the extension of credit to or review or collection of an account of the consumer where the medical information to be furnished is relevant to process or effect the transaction and specific consumer consent was provided for the furnishing of the consumer report that describes the use of which the medical information will be furnished.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222219', '22222222-2222-2222-2222-222222222222', '27', 'For employment purposes where the medical information to be furnished is relevant to process or effect the transaction and specific consumer consent was provided for the furnishing of the consumer report that describes the use for which the medical information will be furnished.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221a', '22222222-2222-2222-2222-222222222222', '28', 'In connection with the underwriting of insurance. Specific consumer consent was given for the release of medical information contained within the consumer report.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221b', '22222222-2222-2222-2222-222222222222', '29', 'In connection with a transaction where the credit file including any medical information in it is only to be provided directly to the individual consumer to whom the information relates and specific consumer consent was received for the receipt and furnishing of the consumer report including medical information to the consumer.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221c', '22222222-2222-2222-2222-222222222222', '51', 'In accordance with written instructions of the consumer providing consent for use related to bankruptcy filing purposes.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221d', '22222222-2222-2222-2222-222222222222', '52', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to an automobile or truck.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221e', '22222222-2222-2222-2222-222222222222', '53', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to automotive repair.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222221f', '22222222-2222-2222-2222-222222222222', '54', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to automotive parts tires etc.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222220', '22222222-2222-2222-2222-222222222222', '55', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a boat or recreational vehicle.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', '56', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to farm equipment.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '57', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a mortgage loan origination.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222222', '58', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a mortgage loan refinancing.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222224', '22222222-2222-2222-2222-222222222222', '59', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a home equity loan line of credit.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222225', '22222222-2222-2222-2222-222222222222', '60', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a personal loan.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222226', '22222222-2222-2222-2222-222222222222', '61', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to a credit card.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222227', '22222222-2222-2222-2222-222222222222', '62', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to home furnishings.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222228', '22222222-2222-2222-2222-222222222222', '63', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to general contracting / home improvement.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222229', '22222222-2222-2222-2222-222222222222', '64', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to air conditioning / heating / plumbing or electrical.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222a', '22222222-2222-2222-2222-222222222222', '65', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to lumber / building materials / hardware.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222b', '22222222-2222-2222-2222-222222222222', '66', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to hospitalization / medical care / dental care.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222c', '22222222-2222-2222-2222-222222222222', '67', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to personal services.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222d', '22222222-2222-2222-2222-222222222222', '68', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to home heating oil / fuel.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222e', '22222222-2222-2222-2222-222222222222', '69', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to telephone / electrical / gas / water utilities or household garbage removal.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-22222222222f', '22222222-2222-2222-2222-222222222222', '70', 'In connection with a credit transaction involving the consumer and for the extension of credit or review or collection of an account of the consumer related to wholesale goods.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222230', '22222222-2222-2222-2222-222222222222', '71', 'For the purpose of providing a consumer with a copy of his/her consumer report or credit score upon the consumer’s request.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222231', '22222222-2222-2222-2222-222222222222', '72', 'For the purpose of administering a credit file or credit score monitoring service to which the consumer has subscribed.', CURRENT_TIMESTAMP),
    ('e2222222-2222-2222-2222-222222222232', '22222222-2222-2222-2222-222222222222', '73', 'For use by a housing counseling agency where the consumer has provided his/her specific consent.', CURRENT_TIMESTAMP);

-- Experian Commercial permissible purposes (Common list)
INSERT INTO VendorPermissiblePurposes (Id, VendorConfigurationId, Code, Description, CreatedOn)
VALUES
    ('e3333333-3333-3333-3333-333333333301', '33333333-3333-3333-3333-333333333333', '1', 'General Credit', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333302', '33333333-3333-3333-3333-333333333333', '2', 'Collections', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333303', '33333333-3333-3333-3333-333333333333', '3', 'Credit Card', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333304', '33333333-3333-3333-3333-333333333333', '4', 'Auto / Transport', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333305', '33333333-3333-3333-3333-333333333333', '5', 'Personal', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333306', '33333333-3333-3333-3333-333333333333', '6', 'Unsecured', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333307', '33333333-3333-3333-3333-333333333333', '7', 'Installment', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333308', '33333333-3333-3333-3333-333333333333', '8', 'Line Of Credit', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333309', '33333333-3333-3333-3333-333333333333', '9', 'Mortgage Origination', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333310', '33333333-3333-3333-3333-333333333333', '10', 'Refinance/Equity', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333311', '33333333-3333-3333-3333-333333333333', '11', 'Second Mortgage', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333312', '33333333-3333-3333-3333-333333333333', '12', 'Rental/Lease', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333313', '33333333-3333-3333-3333-333333333333', '13', 'Commercial', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333314', '33333333-3333-3333-3333-333333333333', '14', 'Insurance', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333315', '33333333-3333-3333-3333-333333333333', '15', 'Employment', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333316', '33333333-3333-3333-3333-333333333333', '16', 'Child Support', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333317', '33333333-3333-3333-3333-333333333333', '17', 'Utilities', CURRENT_TIMESTAMP),
    ('e3333333-3333-3333-3333-333333333318', '33333333-3333-3333-3333-333333333333', '18', 'Government', CURRENT_TIMESTAMP);

-- Insert VendorPremierProfilesProductConfiguration for Experian PremierProfiles product
INSERT INTO VendorProductSpecificConfigurations (
    Id,
    VendorProductId,
    ProductName,
    BusinessAggregates,
    CreatedOn)
VALUES (
           'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
           'ad40fb69-88d3-4e69-86b0-f26ea7fcfc54',
           'PremierProfiles',
           false,
           CURRENT_TIMESTAMP
       );

-- Insert VendorPremierProfilesPdfProductConfiguration for Experian PremierProfilesPdf product
INSERT INTO VendorProductSpecificConfigurations (
    Id,
    VendorProductId,
    ProductName,
    BusinessAggregates,
    CreatedOn)
VALUES (
           'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
           '99999999-9999-9999-9999-999999999999',
           'PremierProfilesPdf',
           false,
           CURRENT_TIMESTAMP
       );

-- Seed data for VendorProductAddons table
-- Addons for Experian CreditReport product
INSERT INTO VendorProductAddons (Id,
                                 AddOnType,
                                 Code,
                                 Description,
                                 VendorProductId,
                                 CreatedOn)
VALUES ('ad111111-1111-1111-1111-111111111111',
        'Mla',
        'Y',
        'Military Lending Act (MLA)',
        '44444444-4444-4444-4444-444444444444',
        CURRENT_TIMESTAMP);

INSERT INTO VendorProductAddons (Id,
                                 AddOnType,
                                 Code,
                                 Description,
                                 VendorProductId,
                                 CreatedOn)
VALUES ('ad222222-2222-2222-2222-222222222222',
        'Ofac',
        'Y',
        'Office of Foreign Assets Control (OFAC)',
        '44444444-4444-4444-4444-444444444444',
        CURRENT_TIMESTAMP);

-- Addons for Equifax ConsumerCreditProfile product
INSERT INTO VendorProductAddons (Id,
                                 AddOnType,
                                 Code,
                                 Description,
                                 VendorProductId,
                                 CreatedOn)
VALUES ('ad333333-3333-3333-3333-333333333333',
        'Mla',
        'B',
        'Military Lending Act (MLA)',
        '88888888-8888-8888-8888-888888888888',
        CURRENT_TIMESTAMP);
