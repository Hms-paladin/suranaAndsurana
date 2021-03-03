<div className="searchfilterflex">
<div className="searchfilterflex1">
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Traits</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Certifications</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Acheivements</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>

</div>
<div className="searchfilterflex2">
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Specialization</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Capabilities</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Talents</span><Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
        placeholder="" optionFilterProp="children"
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="SelectionInput"  >

    </Select></div>
    <div className="searchfilterdrpdwn"><span className="dropdown_title">Status</span>
        <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
            placeholder="" optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="SelectionInput"  >
            {optionvalues.map((data, index) => (
                <Option value={data.name} key={index}>{data.name}</Option>))}
        </Select></div>
    <Button>Go</Button>
</div>

</div>
