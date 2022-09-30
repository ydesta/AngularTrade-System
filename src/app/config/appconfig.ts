import { Injectable } from '@angular/core';

@Injectable()
export class AppConfiguration {
    urls = {
        baseUrl: './',
        customers: 'api/customers/',
        investors: 'api/investors/',
        customer: 'api/customer/',
        investor: 'api/investor',
        login: 'api/login/',
        logout: 'api/logout/',
        lookups: 'api/Lookups/',
        InvestorTitle: 'api/InvestorTitle/et',
        // regions: 'api/Regions/',

        // region: 'api/Region',
        // zones: 'api/AllZones/',
        // woredas: 'api/AllWoredas/',
        // kebeles: 'api/AllKebeles/',

        // new merged
        // login: 'api/login/',
        // logout: 'api/logout/',
        // lookups: 'api/Lookups/',
        // regions: 'api/Region/',
        // zones: 'api/Zones/',
        // towns: 'api/Town/',
        // woredas: 'api/Woredas/',
        // kebeles: 'api/Kebeles/',
        projects: 'api/projects',
        address: 'api/addresses',

        // site: 'api/sites/',
        projectCost: 'api/projectCosts',
        ActualCost: 'api/projectCosts/ActualCost',

        projectCostByProjectID: 'api/ProjectCosts/ByProject',
        projectEmployment: 'api/ProjectEmployments',
        ActualEmployment: 'api/ProjectEmployments/ActualEmployment',


        employmentByProject: 'api/ProjectEmployments/ByProject',
        NationalityCompositions: 'api/ProjectNationalityCompositions',
        NationalityCompositionsByProject: 'api/ProjectNationalityCompositions/ByProject',
        nationality: 'api/Nationalities',
        pRequirement: 'api/ProjectRequirements',
        pInput: 'api/ProjectInputs',
        InputsByProject: 'api/ProjectInputs/ByProject',

        pOutPut: 'api/ProjectOutputs',
        ActualProduct: 'api/ProjectOutputs/ActualProduct',

        pOutPutByProject: 'api/ProjectOutputs/ByProject',
        serviceSteps: 'api/ServiceSteps',
        search: 'api/ServiceApplications/Api/Search',
        document: 'api/Document',

        // firie api
        //     customers: 'api/customers/',
        //     customer: 'api/customer',
        serviceslookup: 'api/serviceslookup',
        services: 'api/services',
        service: 'api/service',
        serviceprerequisites: 'api/serviceprerequisites',
        serviceprerequisite: 'api/serviceprerequisite',
        serviceprerequisiteByParent: 'api/serviceprerequisite/ByParent',
        tariffs: 'api/tariffs',
        tariff: 'api/tariff',
        servicetariffs: 'api/servicetariffs',
        servicetariff: 'api/servicetariff',
        servicesteppers: 'api/servicesteppers',
        servicestepper: 'api/servicestepper',
        servicestepperStepByParentId: 'api/servicestepper/ByParentId',

        orders: 'api/orders',
        order: 'api/order',
        sites: 'api/sites',
        site: 'api/site',

        serviceapplications: 'api/serviceapplications',
        serviceapplication: 'api/serviceapplication',

        sectors: 'api/sectors',
        sector: 'api/sector',
        subsectors: 'api/subsectors/',
        subsector: 'api/subsector',
        subsectorByParent: 'api/subsector/ByParent',
        activitys: 'api/activitys/',
        activity: 'api/activity',
        activityByParent: 'api/activity/ByParent',
        invactivitys: 'api/invactivitys/',
        invactivity: 'api/invactivity',
        invactivityByParent: 'api/invactivity/ByParent',
        KebelesByWoreda: 'api/KebelesByWoreda',
        regions: 'api/Regions',
        region: 'api/region',
        zones: 'api/Zones',
        zone: 'api/zone',

        towns: 'api/Towns',
        town: 'api/town',


        woredas: 'api/Woredas',
        woreda: 'api/woreda',
        woredaByParent: 'api/woredaByParent',
        kebeles: 'api/Kebeles',
        kebele: 'api/Kebele',
        servicePrerequisiteByServiceId: 'api/servicePrerequisiteByServiceId',
        // order: 'api/Order',
        ServiceApplications: 'api/ServiceApplications',
        certificate: 'api/certificate',
        Notification: 'api/Notifications',
        ChangeStatus: 'api/Notifications/ChangeStatus',
        CountNotification: 'api/Notifications/CountNotification',
        investorAdress: 'api/certificate/investorAdress',
        projectRenewals: 'api/projectRenewals',
        ProjectCancellations: 'api/ProjectCancellations',
        projectList: 'api/Projects/list',
        ProjectOnlyByInvestorId: 'api/Projects/ProjectOnlyByInvestorId',
        approveProject: 'api/Projects/approveProject',
        ProjectsGetProjectStatus: 'api/Projects/GetProjectStatus',

        ServiceApplicationsByInvestorId: 'api/ServiceApplications/ByInvestorId',
        ServiceApplicationsByOfficerId: 'api/ServiceApplications/ByOfficerId',
        finalForApproval: 'api/ServiceApplications/finalForApproval',
        ChangeApplicationStatus: 'api/ServiceApplications/ChangeApplicationStatus',
        ChangeInvestorApplicationStatus: 'api/ServiceApplications/ChangeInvestorApplicationStatus',
        ApplicationGroupByServiceId: 'api/ServiceApplications/ApplicationGroupByServiceId',
        ProjectGroupByStage: 'api/ServiceApplications/ProjectGroupByStage',
        ProjectGroupByEconomicSector: 'api/ServiceApplications/ProjectGroupByEconomicSector',
        AllProjectByProjectStage: 'api/ServiceApplications/AllProjectByProjectStage',
        ApplicationStart: 'api/ServiceApplications/ApplicationStart',

        ServiceApplicationWithRenewal: 'api/ServiceApplications/ServiceApplicationWithRenewal',
        ServiceApplicationCancellation: 'api/ServiceApplications/ServiceApplicationCancellation',
        ServiceApplicationSubstitute: 'api/ServiceApplications/ServiceApplicationSubstitute',
        ServiceApplicationBillOfMaterial: 'api/ServiceApplications/ServiceApplicationBillOfMaterial',

        ProjectsByInvestorId: 'api/Projects/ByInvestorId',
        SearchInvestor: 'api/SearchInvestor',

        TodoTasks: 'api/TodoTasks',
        CompletedTask: 'api/TodoTasks/CompletedTask',
        PendingTask: 'api/TodoTasks/PendingTask',
        isEmailRegisterd: '/api/account/isEmailRegisterd',
        isTinRegisterd: '/api/account/isTinRegisterd',

        InvestorByUserId: 'api/InvestorByUserId',
        InvestorByTIN: 'api/InvestorByTIN',
        // SearchInvestor: 'api/SearchInvestor',


        ProjectSubstitutes: 'api/ProjectSubstitutes',

        lookupById: 'api/lookup/ById',
        lookupByParentId: 'api/lookup/ByParentId',
        lookup: 'api/lookup',
        lookuptypeById: 'api/lookuptype/ById',
        lookuptype: 'api/lookuptype',
        woredaById: 'api/woreda/ById',
        kebeleById: 'api/Kebele/ById',
        kebeleByByParentId: 'api/Kebeles/ByParent',
        regionsById: 'api/Regions/ById',
        zoneById: 'api/Zones/ById',
        zoneByParentId: 'api/Zones/ByParentId',
        townById: 'api/Towns/ById',
        requirementByProject: 'api/ProjectRequirements/ByProject',
        ProjectsDetail: 'api/Projects/Detail',
        IncentiveLogs: 'api/IncentiveLogs',

        associates: 'api/Associates',
        byInvestorId: 'api/Associates/ByInvestorId',
        GetOneAssociateByInvestorID: 'api/Associates/GetOneAssociateByInvestorID',
        ProjectAssociates: 'api/ProjectAssociates',
        ProjectAssociatesByProject: 'api/ProjectAssociates/ByProject',


        IncentiveBoMImportItems: 'api/IncentiveBoMRequestItems',
        IncentiveBoMImportItemsFinalForApproval: 'api/IncentiveBoMRequestItems/finalForApproval',
        IncentiveBoMImportItem: 'api/IncentiveBoMRequestItems/ImportItem',


        incentiveRequestItems: 'api/incentiveRequestItems/ByProjectId',
        incentiveRequestItem: 'api/incentiveRequestItem',
        incentivecategorylookup: 'api/incentivecategorylookup/en',

        letterTemplate: 'api/letterTemplate',
        letterTemplates: 'api/letterTemplates',

        taxexemption: 'api/taxexemption',
        taxexemptions: 'api/taxexemptions',
        taxexemptionyear: 'api/taxexemptionyear',

        ApplicationSettings: 'api/ApplicationSettings',
        ProjectStatusHistory: 'api/ProjectStatusHistories',

        projectsDetailForLetters: 'api/Projects/ProjectDetail',
        letter: 'api/letter',
        letters: 'api/letters',


        incentiveRequests: 'api/incentiveRequests/ByIds',
        incentiveRequest: 'api/incentiveRequest',
        incentiveRequestsothers: 'api/incentiveRequests/ByOtherServiceAppId',
        incentiveRequestsByProjectId: 'api/incentiveRequests/ByProjectId',

        IncentiveRequestDetail: 'api/IncentiveRequestDetail',
        IncentiveRequestDetails: 'api/IncentiveRequestDetails',
        IncentiveBoMRequestItems: 'api/IncentiveBoMRequestItems',

        CapitalRegistrations: 'api/CapitalRegistrations',
        CapitalRegistrationsByProject: 'api/CapitalRegistrations/ByProject',
        incentiveRequestByServiceAppId: 'api/IncentiveRequest/ByServiceAppId',

        IncentiveRequestDetailofSparePart: 'api/IncentiveRequestDetail/getSparePart',
        incentiveRequestsDetailByProjectId: 'api/IncentiveRequestDetail/DetailByProjectId',

        CompanyClearances: 'api/CoChangeApplicationStatusmpanyClearances',
        CompanyClearanceByInvestorId: 'api/CompanyClearances/getCompanyClearanceByInvestorId',
        SaveFinalApprovedName: 'api/CompanyClearances/SaveFinalApprovedName',


        ServiceApplicationWithInvestor: 'api/ServiceApplications/ServiceApplicationWithInvestor',
        ServiceApplicationById: 'api/ServiceApplications/ServiceApplicationById',


        ByParentIdandByCode: 'api/lookup/ByParentIdandByCode',
        IncentiveBoMImportItemByProjectId: 'api/IncentiveBoMRequestItems/GetByProjectId',


        lettersByProjectId: 'api/letters/ByProjectId',
        IncentiveRequestDetailsByProjectId: 'api/IncentiveRequestDetail/ByProjectId',
        IncentiveRequestDetailsByCategoryId: 'api/IncentiveRequestDetail/ByCategoryId',

        GetAllBudgetYearTypes: 'api/GetAllBudgetYearTypes',
        Divisions: 'api/Divisions/',
        MajorDivisions: 'api/MajorDivisions',
        GetMajorDivisionsByInvestorID: 'api/GetMajorDivisionsByInvestorID',
        MajorGroup: 'api/MajorGroup/',
        Groups: 'api/Groups/',
        SubGroups: 'api/SubGroups',
        BussinessBranchByInvestorId: 'api/BusinessBranch/BussinessBranchByInvestorId',
        RegistrationBranchByInvestorId: 'api/BusinessBranch/RegistrationBranchByInvestorId',
        SaveBussinessBranch: 'api/BusinessBranch/Save',
        DeleteBussinessBranch: 'api/BusinessBranch/Delete',
        Bussiness: 'api/Business/Save',
        SaveBussinessLicense: 'api/SaveBussinessLicense',
        GetBusinessLicenseGroup: 'api/GetBusinessLicenseGroup',
        GetRegistrationCatagory: 'api/Business/GetRegistrationCatagory',
        GetBusiness: 'api/Business/GetBussiness',

        Registrations: 'api/recognition/GetRegistrations',
        RegistrationByTin: 'api/RegistrationByTin',
        SaveRegistration: 'api/saveregistration',
        UpdateRegistration: 'api/UpdateRegistration',
        SaveRegistrationCatagory: 'api/registrationcatagory',
        followup: 'api/followup',
        followupedit: 'delete/followup',
        GetBussinessMajorCatagory: 'api/Business/GetBussinessMajorcata',
        GetBussinessCatagory: 'api/Business/GetBussinessCatagory',


        url: (name, parm1?, parm2?, parm3?) => {
            let url = this.urls.baseUrl + this.urls[name];
            if (parm1) {
                url += '/' + parm1;
            }
            if (parm2) {
                url += '/' + parm2;
            }
            if (parm3) {
                url += '/' + parm3;
            }

            return url;
        }
    };

    // put config variables here

    constructor() {
        this.urls.baseUrl = 'http://localhost:5000/';
        // this.urls.baseUrl = 'http://localhost:5000/';
    }
}
