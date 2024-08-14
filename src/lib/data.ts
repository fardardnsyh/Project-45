"use server";
import { getXataClient } from "@/xata";
import { iContains } from "@xata.io/client";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

// import xata client
const xataClient = getXataClient();

// create functions to get data for each card
export async function getCardData() {
    noStore(); // disable caching for this function
    const session = await getServerSession();
    const userId = session?.user?.email;
    if (!userId) {
        return {
          totalApplications: 0,
          totalApplied: 0,
          totalInterviews: 0,
          totalOffers: 0,
          totalRejected: 0,
        };
      }
    const totalApplicationsPromise = xataClient.db.applications.filter({userId: userId}).getMany();
    const totalAppliedPromise = xataClient.db.applications.filter({userId: userId, status: "applied"}).getMany();
    const totalInterviewsPromise = xataClient.db.applications.filter({userId: userId, status: "interview"}).getMany();
    const totalOffersPromise = xataClient.db.applications.filter({userId: userId, status: "offer"}).getMany();
    const totalRejectedPromise = xataClient.db.applications.filter({userId: userId, status: "rejected"}).getMany();

    const data = await Promise.all([totalApplicationsPromise, totalAppliedPromise, totalInterviewsPromise, totalOffersPromise, totalRejectedPromise]);

    const totalApplications = data[0].length ?? 0;
    const totalApplied = data[1].length ?? 0;
    const totalInterviews = data[2].length ?? 0;
    const totalOffers = data[3].length ?? 0;
    const totalRejected = data[4].length ?? 0;

    const cleanData = {
        totalApplications,
        totalApplied,
        totalInterviews,
        totalOffers,
        totalRejected
    }

    return cleanData;
}

// create function to get data for the table
export async function getTableData(query:string, sortColumns: object, filterStatus: string[]) {
    noStore(); // disable caching for this function
    const session = await getServerSession();
    const userId = session?.user?.email;
    if (!userId) return; // if no userId, then return - this should never happen
    const { applications } = xataClient.db;
    let records =  applications
        .any(
            applications.filter({company: iContains(query)}),
            applications.filter({position: iContains(query)}),
            applications.filter({status: iContains(query)}),
            applications.filter({notes: iContains(query)}),
        )
        .filter({userId: userId})
        .filter({status: {$any: filterStatus}})
    for (let [column, order] of Object.entries(sortColumns)) {
        if (order === '') continue;
        // doing this switch statement to bypass Argument of type 'string' is not assignable to parameter of type 
        // 'SortColumns<ApplicationsRecord>' error for column param in sort()
        switch (column) {
            case 'company':
                records = records.sort('company', order);
                break;
            case 'position':
                records = records.sort('position', order);
                break;
            case 'status':
                records = records.sort('status', order);
                break;
            case 'notes':
                records = records.sort('notes', order);
                break;
            case 'lastUpdated':
                records = records.sort('lastUpdated', order);
                break;
        }
    }
    const sortedRecords = await records.getMany();
    return sortedRecords;
}

// create function to delete an application
export async function deleteApplication(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) return; // if no id, then return - this should never happen
    await xataClient.db.applications.delete(id);
    revalidatePath('/');
}

// create function to add an application
export async function addApplication(formData: FormData) {
    const company = formData.get('company')?.toString();
    const position = formData.get('position')?.toString();
    const status = formData.get('status')?.toString();
    const notes = formData.get('notes')?.toString();
    const userId = formData.get('userId')?.toString();
    const postingLink = formData.get('postingLink')?.toString();
    const dateStr = formData.get('date')?.toString();
    const date = dateStr ? new Date(dateStr) : "";
    if (!company || !position || !status || !userId || !date) return; // if any of these are missing, then return - this should never happen
    const newApplication = {
        position,
        userId,
        company,
        postingLink,
        status,
        notes,
        lastUpdated: date
    }
    await xataClient.db.applications.create(newApplication);
    revalidatePath('/');
}

// create function to update an application
export async function updateApplication(formData: FormData) {
    const id = formData.get('id')?.toString();
    const company = formData.get('company')?.toString();
    const position = formData.get('position')?.toString();
    const status = formData.get('status')?.toString();
    const notes = formData.get('notes')?.toString();
    const postingLink = formData.get('postingLink')?.toString();
    const dateStr = formData.get('date')?.toString();
    const date = dateStr ? new Date(dateStr) : new Date();
    if (!id || !company || !position || !status || !date) return; // if any of these are missing, then return - this should never happen
    const updatedApplication = {
        position,
        company,
        postingLink,
        status,
        notes,
        lastUpdated: date
    }
    await xataClient.db.applications.update(id, updatedApplication);
    revalidatePath('/');
}