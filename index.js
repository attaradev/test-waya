/*
The Problem

The following illustrates a simple structure of companies and the plots of lands they own. Each company may belong to  a parent 
company, example, company with ID c3 belongs to parent company with ID 1. 


const companies = [
  { id: "c1", name: "Big Corp A", parentId: null },
  { id: "c2", name: "Big Corp B", parentId: null },
  { id: "c3", name: "Medium Corp A", parentId: "c1" },
  { id: "c4", name: "Medium Corp B", parentId: "c2" },
  { id: "c5", name: "Small Corp A", parentId: "c3" },
  { id: "c6", name: "Small Corp B", parentId: "c3" },
];

const plotsOfLand = [
  { id: "l1", companyId: "c1" },
  { id: "l2", companyId: "c2" },
  { id: "l3", companyId: "c3" },
  { id: "l4", companyId: "c5" },
  { id: "l5", companyId: "c5" },
];
 
We would like you to implement a solution that returns which plot of lands  the given company owns, both directly and indirectly, ie, 
own by the parent company and it's subsidiaries.

Example, company c1 will  own the following plot of lands by itself and sub-companies => ["l1","l3","l4","l5"]
 
When you are ready, please open any text-editor/IDE you wish, paste the code below, and share your screen so we can collaborate on the solution.
 
** Don't forget you can ask as many questions as you want. **

 Implement the following function
 E.g. getLandParcelsForCompany("c1") => ["l1","l3","l4","l5"]
 
*/

// get subsidiaries of provided company and their subsidiaries (recursive)
// get plots of land that belongs to the company or subsidiaries
// return the ids of the plots of land

const companies = [
  { id: "c1", name: "Big Corp A", parentId: null },
  { id: "c2", name: "Big Corp B", parentId: null },
  { id: "c3", name: "Medium Corp A", parentId: "c1" },
  { id: "c4", name: "Medium Corp B", parentId: "c2" },
  { id: "c5", name: "Small Corp A", parentId: "c3" },
  { id: "c6", name: "Small Corp B", parentId: "c3" },
];

const plotsOfLand = [
  { id: "l1", companyId: "c1" },
  { id: "l2", companyId: "c2" },
  { id: "l3", companyId: "c3" },
  { id: "l4", companyId: "c5" },
  { id: "l5", companyId: "c5" },
];

const getSubsidiaries = (company, subs = []) => {
  const subsidiaries = companies
    .filter((com) => com.parentId === company)
    .map((c) => c.id);

  if (subsidiaries.length == 0) {
    // return provided subsidiaries
    return subs;
  }

  // recursively get subsidiaries for subsidiaries
  return subsidiaries.reduce((acc, company) => {
    return acc.concat(getSubsidiaries(company, acc));
  }, subsidiaries);
};

const getLandParcelsForCompany = (id) => {
  const subsidiaries = getSubsidiaries(id);
  return plotsOfLand
    .filter((p) => [id, ...subsidiaries].includes(p.companyId))
    .map((land) => land.id);
};

console.log(getLandParcelsForCompany("c1"));
