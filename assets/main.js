import { boampData } from "./indexeddb.js";

const populateTable = () => {
  const tableBody = document.querySelector("#data-table tbody");

  boampData.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add(
      "odd:bg-white",
      "odd:dark:bg-gray-900",
      "even:bg-gray-50",
      "even:dark:bg-gray-800",
      "border-b",
      "dark:border-gray-700",
      "hover:bg-gray-100",
      "dark:hover:bg-gray-600"
    );
    row.innerHTML = `
            <th scope="row" class="px-6 py-4 whitespace-nowrap">
              ${item.idweb}
            </th>
            <td class="px-6 py-4">
              ${item.objet}
            </td>
            <td class="px-6 py-4">
              ${item.dateparution}
            </td>
            <td class="px-6 py-4">
              ${item.datelimitereponse.split("T")[0]}<br>
              ${item.datelimitereponse.split("T")[1]}
            </td>
            <td class="px-6 py-4">
              ${item.nomacheteur}
            </td>
            <td class="px-6 py-4">
              <a href="${
                item.url_avis
              }" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">${
      item.url_avis
    }</a>
            </td>
          `;
    tableBody.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", populateTable);
