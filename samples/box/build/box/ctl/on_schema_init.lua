--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local function function_for_before_replace(old, new_)
    if not old and new_ and new_[3] == "space_name" and new_[4] ~= "vinyl" then
        return new_:update({{[1] = "=", [2] = 4, [3] = "vinyl"}})
    end
end
box.ctl.on_schema_init(function()
    box.space._space:before_replace(function_for_before_replace)
end)
return ____exports
